import {Router} from "express"
import verifyJwtLogin from "../middlewares/auth.middleware.js"
import isAdmin from "../middlewares/isAdmin.middleware.js"
import { createTrainner, trainerProfileUpload, deleteAllTrainers, deleteTrainner, getTrannerById, getAllTrainners, getTrainnerDetails, updateTrainner } 
from "../controllers/trainner.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

// Protected Route
router.route("/create-trainner").post(verifyJwtLogin, isAdmin, createTrainner)
router.route("/delete-trainer/:id").delete(verifyJwtLogin, isAdmin, deleteTrainner)
router.route("/delete-all").delete(verifyJwtLogin, isAdmin, deleteAllTrainers)
router.route("/update-trainer/:id").put(verifyJwtLogin, isAdmin, updateTrainner)
router.route("/get-trainners").get(verifyJwtLogin, isAdmin, getAllTrainners)
router.route("/get-trainner-details/:id").get(verifyJwtLogin, isAdmin, getTrainnerDetails)
router.route("/get-trainerby-id").post(verifyJwtLogin, isAdmin, getTrannerById)
router.route("/upload-profile").post(verifyJwtLogin, isAdmin, upload.single("profilePic"), trainerProfileUpload)

export default router