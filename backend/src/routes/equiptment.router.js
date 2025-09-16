import { Router } from "express"
import verifyJwtLogin from "../middlewares/auth.middleware.js"
import isAdmin from "../middlewares/isAdmin.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

import {createEquiptment, updateEquiptment, deleteEquiptment, getAllEquiptment} 
from "../controllers/equiptment.controller.js"

const router = Router()

// Protected Routes
router.route("/create-equiptment").post(verifyJwtLogin, isAdmin, upload.single('image'), createEquiptment)
router.route("/update-equiptment/:id").put(verifyJwtLogin, isAdmin, updateEquiptment)
router.route("/delete-equiptment/:id").delete(verifyJwtLogin, isAdmin, deleteEquiptment)
router.route("/get-all-equiptment").get(getAllEquiptment)

export default router