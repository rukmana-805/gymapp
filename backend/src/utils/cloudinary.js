import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import dotenv from "dotenv"
import { asyncHandler } from "../utils/asyncHandler.js"

dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {

//     console.log("Cloudinary config:", {
//   name: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_API_KEY,
//   secret: process.env.CLOUDINARY_SECRET
// });


    try {
        console.log("Cloudinary Path",localFilePath)
        if(!localFilePath) return null
        localFilePath = localFilePath.replace(/\\/g, "/")
        console.log("After If Cloudinary Path",localFilePath)
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "image" // could be video, image
        })

        console.log("Responce", responce)
        fs.unlinkSync(localFilePath)
        return responce

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
            return null
        }
    }
}


const deleteFromCloudinary = asyncHandler(async (image_url) => {

    // Extracting public_id
    //url : https://res.cloudinary.com/deodfrj3x/image/upload/v1718212070/temp/abc123.jpg
    //public_id : temp/abc123

    try {
        const parts = image_url.split("/")
        const fileName = parts[parts.length -1]
        const folderName = parts[parts.length -2]
    
        const public_id = `${folderName}/${fileName.split(".").slice(0, -1).join(".")}`
    
        const result = await cloudinary.uploader.destroy(public_id)
        return result

    } catch (error) {
        console.log("Error Occer While deleting from cloudinary")
        return null
    }
})

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}