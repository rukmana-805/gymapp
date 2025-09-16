import Trainner from "../models/Trainner.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const createTrainner = asyncHandler(async (req, resp) => {
  const { name, specialization, profilePic, experienceInYears, email, phone } =
    req.body;

  if (!(name && specialization && experienceInYears && email && phone)) {
    return resp.status(400).json({ message: "Empty fields not allowed" });
  }

  // const localFilePath = req.file?.path
  // if (!localFilePath) return resp.status(400).json({ message: "Profile picture is required" });

  // const trainnerPic = await uploadOnCloudinary(localFilePath)
  // if(!trainnerPic.url){
  //     return resp.status(400).json({ message: "Error while uploading on cloudinary" });
  // }

  const trainner = await Trainner.create({
    name,
    specialization,
    experienceInYears,
    email,
    phone,
    profilePic: "",
  });

  if (!trainner) {
    return resp.status(400).json({ message: "Trainner Registration Failed" });
  }

  return resp.status(200).json({
    success : true,
    message: "Trainner Registered Successfully",
    trainner: trainner,
  });
});

const trainerProfileUpload = asyncHandler(async (req, resp) => {

  const { profileId } = req.body
  
  const trainer = await Trainner.findById(profileId)
  const profilePicURL = trainer.profilePic;
  const localFilePath = req.file?.path;

  if(profilePicURL !== ""){
    console.log("Delete iniciate")
    await deleteFromCloudinary(profilePicURL);
    console.log("deletion complete")
  }

  const newProfilePic = await uploadOnCloudinary(localFilePath);
  if (!newProfilePic.url) {
    return resp
      .status(400)
      .json({ message: "Error while uploadiing on cloudinary" });
  }

  const trainer_with_profile = await Trainner.findByIdAndUpdate(
    trainer._id,
    {
      $set: {
        profilePic: newProfilePic.url,
      },
    },
    { new: true }
  ).select("-password");

  return resp.status(200).json({
    success : true,
    message: "Profile Picture Updated Successfully",
    trainer: trainer_with_profile,
  });
});

const deleteTrainner = asyncHandler(async (req, resp) => {
  const trainnerId = req.params?.id;
  if (!trainnerId) {
    return resp.status(400).json({ message: "Trainner id not found" });
  }

  const trainner = await Trainner.findByIdAndDelete(trainnerId);
  if (!trainner) {
    return resp.status(404).json({ message: "TrainnerId not found" });
  }

  return resp.status(200).json({ 
    success : true,
    message: "Trainner deleted successfully"
  });
});

const updateTrainner = asyncHandler(async (req, resp) => {
  const { name, specialization, experienceInYears, email, phone } = req.body;

  const trainnerId = req.params?.id;
  // const localFilePath = req.file?.path;

  // const profilePicture = await uploadOnCloudinary(localFilePath);

  const updatedTrainner = await Trainner.findByIdAndUpdate(
    trainnerId,
    {
      $set: {
        name,
        specialization,
        experienceInYears,
        email,
        phone,
        // profilePic: profilePicture?.url,
      },
    },
    { new: true }
  );

  if (!updatedTrainner) {
    return resp.status(404).json({ message: "Trainer not found" });
  }

  resp.status(200).json({
    success : true,
    message: "Trainner Updated Successfully",
    tariner: updateTrainner,
  });
});

const getTrainnerDetails = asyncHandler(async (req, resp) => {
  const trainnerId = req.params?.id;
  const trainner = await Trainner.findById(trainnerId);
  if (!trainner) {
    return resp.status(404).json({ message: "Trainner not found" });
  }
  return resp.status(200).json({
    message: "Trainner Details Found successfully",
    trainner: trainner,
  });
});

const getAllTrainners = asyncHandler(async (_, resp) => {
  const trainners = await Trainner.find({});
  if (!trainners) {
    return resp.status(404).json({ message: "There is no trainners" });
  }

  return resp.status(200).json({
    message: "Trainner Fetched Successfully",
    trainners,
  });
});

const getTrannerById = asyncHandler( async (req, resp) => {
  const { trainer_id } = req.body
  const trainer = await Trainner.findById(trainer_id)
  if(!trainer){
    return resp.status(401).json({
      message : "Trainer not found"
    })
  }

  return resp.status(200).json({
    trainer
  })
})

const deleteAllTrainers = asyncHandler(async (req, resp) => {
  const result = await Trainner.deleteMany({})

  if (result.deletedCount === 0) {
    return resp.status(404).json({
      success: false,
      message: "No trainers found to delete"
    });
  }
  
  return resp.status(200).json({
    success:true,
    message:"All Trainers deleted Successfully",
    deletedCount: result.deletedCount
  })
})

export {
  createTrainner,
  deleteTrainner,
  trainerProfileUpload,
  updateTrainner,
  getTrainnerDetails,
  getAllTrainners,
  getTrannerById,
  deleteAllTrainers
};
