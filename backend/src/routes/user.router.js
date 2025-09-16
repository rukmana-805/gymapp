import {Router} from "express"
import {loginUser, registerUser, getUserProfile, logoutUser, uploadProfilePicture} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import verifyJwtLogin from "../middlewares/auth.middleware.js"
import hasPlan from "../middlewares/hasPlan.middleware.js"
import { bookClass } from "../controllers/booking.controller.js"

const router = Router()

// Ena ame route spacify karuchu j e route challe ken function chalba controller ra
// router.route("/register").post(upload.single("profilePic"), registerUser)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").get(verifyJwtLogin, getUserProfile)
router.route("/logout").post(verifyJwtLogin, logoutUser)
router.route("/upload-profile").post(verifyJwtLogin, upload.single("profilePic"), uploadProfilePicture)

router.route("/book-class").post(verifyJwtLogin, hasPlan, bookClass)

export default router