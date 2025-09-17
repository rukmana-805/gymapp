import { asyncHandler } from "../utils/asyncHandler.js"
import User from "../models/user.model.js"

import bcrypt from "bcrypt"
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken =  async (user_id) => {
    try {
        const user = await User.findById(user_id)

        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAccessToken()

        user.refreshToken = refreshToken

        await user.save({validateBeforeSave : false})

        return {refreshToken, accessToken}

    } catch (error) {
        console.log(error)
        return null
    }
}

// Frontend wala ek requist bhejega jab accessToken expire ho jagega tab ham new accessToken and refreshToken denge
const refreshAccessToken = asyncHandler(async (req, resp) => {

    const incommingRefreshToken = req.cookies?.refreshToken
    if(!incommingRefreshToken){
        return resp.status(401).json({message : "Unautharized Access"})
    }

    const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)

    if(!user){
        return resp.status(401).json({message : "Invalid Refresh Token"})
    }

    if(incommingRefreshToken !== user?.refreshToken){
        return resp.status(401).json({message : "Unautharized Access Refresh Token doesn't match"})
    }

    const {accessToken, refreshToken} = generateAccessAndRefreshToken(user._id)

    const options = {
        httpOnly : true,
        secure : true
    }

    resp.status(200).
    cookie("accessToken", accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json({
        message : "Access Token Refreshed Successfully",
        accessToken : accessToken,
        refreshToken : newRefreshToken
    })
})

const registerUser = asyncHandler (async (req, resp) => {

    const {
        username, email, fullName, phone, gender, age, password, role

    } = req.body

    const existingUser = await User.findOne({
        $or : [{username}, {email}]
    })

    if(existingUser){
        return resp.status(400).json({message : "User Already Exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // const localFilePath = req.file?.path

    // console.log(localFilePath)

    // if(!localFilePath){
    //     return resp.status(400).json({message : "Profile Picture is required"})
    // }

    // console.log("After", localFilePath)

    // const profilePicture = await uploadOnCloudinary(localFilePath)

    // console.log("After Coludinary",profilePicture)

    // if(!profilePicture){
    //     return resp.status(400).json({message : "Profile Picture is required"})
    // }

    // console.log(profilePicture)

    const user = await User.create({
        username,
        fullName,
        email,
        password : hashedPassword,
        phone,
        gender,
        age,
        // profilePic : profilePicture.url || "",
        role
    })

    if(!user) {
        return resp.status(400).json({message : "User Registration Failed"})
    }

    const tokens = await generateAccessAndRefreshToken(user._id)
    
    if(!tokens){
        return resp.status(500).json({message : "Token not generate successfully"})
    }

    const {refreshToken, accessToken} = tokens

    const options = {
        httpOnly : true,
        secure : true
    }

    return resp.status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({
        success : true,
        message : "User Registerd Successfully",
        user : {
            id : user._id,
            username : user.username,
            fullName : user.fullName
            // profilePic : user.profilePic
        }
    })

})

const loginUser = asyncHandler(async (req, resp) => {

    const { username, email, password } = req.body
    
    if(!username && !email){
        return resp.status(400).json({message : "Invalid Username or Email"})
    }

    const user = await User.findOne({
        $or : [{username}, {email}]
    })

    if(!user){
        return resp.status(400).json({message : "Invalid Username or Email"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return resp.status(400).json({message : "Invalid Password"})
    }

    const tokens = await generateAccessAndRefreshToken(user._id)
    
    if(!tokens){
        return resp.status(500).json({message : "Token not generate successfully"})
    }

    const {refreshToken, accessToken} = tokens

    const logedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return resp.status(200)
    .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    .json({
        success : true,
        message : "User LogedIn Successfully",
        user : {logedInUser, refreshToken, accessToken}
    })

})


const uploadProfilePicture = asyncHandler (async (req, resp) => {
    
    const localFilePath = req.file?.path
    if(!localFilePath){
        return resp.status(400).json({message : "Profile Picture is required"})
    }

    const profilePicture = await uploadOnCloudinary(localFilePath)
    if(!profilePicture){
        return resp.status(400).json({message : "Upload failed"})
    }

    const user_id = req.user._id
    const user = await User.findById(user_id)
    user.profilePic = profilePicture?.url || ""
    user.save({validateBeforeSave : false})
    
    return resp.status(200).json({
        success : true,
        message : "User Profile update successfully"
    })
})


const logoutUser = asyncHandler( async (req, resp) => {

    const user_id = req.user?._id
    await User.findByIdAndUpdate(
        user_id,
        {
            $set : {
                refreshToken : undefined
            }
        }
    ),
    {new : true}

    const options = {
        httpOnly : true,
        secure : true
    }

    return resp.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
        success : true,
        message : "User Logout Successfully"
    })
})


const getUserProfile = asyncHandler(async (req, resp) => {

    return resp.status(200).json({
        success : true,
        message : "User Details Fetch Successfully",
        user : req.user
    })
})

const changeCurrentPassword = asyncHandler(async (req, resp) => {

    const {oldPassword, newPassword} = req.body

    if(!oldPassword && !newPassword){
        return resp.status(400).json({message : "Fileds required"})
    }

    const user = await User.findById(req.user._id)
    if(!user){
        return resp.status(400).json({message : "Somthing went wrong while updating password"})
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
    if(!isPasswordCorrect){
        return resp.status(400).json({message : "Invalid Old Password"})
    }

    user.password = newPassword
    await user.save({validateBeforeSave : false})

    return resp.status(200).json({
        message : "Password Updated Successfully"
    })
})

const updatePropilePic = asyncHandler(async (req, resp) => {

    const profilePicURL = req.user.profilePic
    await deleteFromCloudinary(profilePicURL)

    const localFilePath = req.file?.path

    const newProfilePic = await uploadOnCloudinary(localFilePath)
    if(!newProfilePic.url){
        return resp.status(400).json({message : "Error while uploadiing on cloudinary"})
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                profilePic : newProfilePic.url
            }
        },
        {new : true}
    ).select("-password")

    return resp.status(200).json({
        message : "Profile Picture Updated Successfully",
        user : user
    })
})

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    changeCurrentPassword,
    updatePropilePic,
    refreshAccessToken,
    uploadProfilePicture
}