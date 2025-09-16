import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import User from "../models/user.model.js"

const verifyJwtLogin = asyncHandler(async (req, resp, next) => {
    try {
        
        const token = req.cookies?.accessToken

        if(!token){
            return resp.status(401).json({message : "Unauthorized Access"})
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            return resp.status(401).json({message : "Invalid Access Token"})
        }

        req.user = user
        next()

    } catch (error) {
        return resp.status(401).json({message : error.message})
    }
})

export default verifyJwtLogin