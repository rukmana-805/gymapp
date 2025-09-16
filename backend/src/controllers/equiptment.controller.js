import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"
import Equiptment from "../models/equiptment.model.js"

const createEquiptment = asyncHandler(async (req, resp) => {

    const {name, description, type, quantity, status} = req.body

    if(!name && !description && !type && !quantity && !status){
        return resp.status(400).json({message : "Empty fields not allowed"})
    }

    const localFilePath = req.file?.path
    if(!localFilePath){
        return resp.status(400).json({message : "Image field required"})
    }

    const equiptmenntPic = await uploadOnCloudinary(localFilePath)
    console.log(equiptmenntPic)
    if(!equiptmenntPic){
        return resp.status(400).json({message : "Error uploading equiptment picture"})
    }

    const equiptment = await Equiptment.create({
        name,
        description,
        type,
        quantity,
        status,
        image : equiptmenntPic?.url || ""
    })

    if(!equiptment){
        return resp.status(400).json({message : "Equiptment not register successfully"})
    }

    resp.status(200).json({
        message : "Equiptment register successfully",
        equiptment : equiptment
    })
})

const getAllEquiptment = asyncHandler(async (req, resp) => {

    const equiptments = await Equiptment.find({})
    if(!equiptments){
        return resp.status(404).json({message : "No equiptment found"})
    }

    return resp.status(200).json({
        message : "Equiptment fetched successfully",
        equiptments
    })
})

const deleteEquiptment = asyncHandler(async (req, resp) => {

    const equiptmentId = req.params?.id

    const deletedEquiptment = await Equiptment.findByIdAndDelete(equiptmentId)
    if(!deletedEquiptment){
        return resp.status(404).json({message : "Equiptment not found"})
    }

    resp.status(200).json({
        message : "Equiptment deleted successfully",
        deletedEquiptment
    })
})

const updateEquiptment = asyncHandler(async (req, resp) => {

    const equiptmentId = req.params?.id

    const {name, description, type, quantity, status} = req.body
    const localFilePath = req.file?.path

    let equiptment = await Equiptment.findById(equiptmentId)

    if(!equiptment){
        return resp.status(404).json({message : "Equiptment not found"})
    }

    const updateImg = null

    if(localFilePath){
        await deleteFromCloudinary(equiptment?.image)
        updateImg = await uploadOnCloudinary(localFilePath)
    }

    const updatedEquiptment = await Equiptment.findByIdAndUpdate(
    equiptmentId,
    {
      name,
      description,
      type,
      quantity,
      status,
      image: localFilePath && updateImg ? updateImg.url : equiptment.image,
    },
    { new: true }
  );

    return resp.status(200).json({
        message : "Equiptment update successfully",
        updatedEquiptment
    })

})

export {
    createEquiptment,
    getAllEquiptment,
    deleteEquiptment,
    updateEquiptment
}