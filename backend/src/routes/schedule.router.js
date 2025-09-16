import { Router } from "express"
import verifyJwtLogin from "../middlewares/auth.middleware.js"
import isAdmin from "../middlewares/isAdmin.middleware.js"
import {addSchedule, deleteSchedule, deleteAllSchedule, updateSchedule, getAllSchedule} 
from "../controllers/schedule.controller.js"

const router = Router()

// Protected Routes
router.route("/add-schedule").post(verifyJwtLogin, isAdmin, addSchedule)
router.route("/get-schedule").get(verifyJwtLogin, isAdmin, getAllSchedule)
router.route("/update-schedule/:day").put(verifyJwtLogin, isAdmin, updateSchedule)
router.route("/delete-schedule/:day").delete(verifyJwtLogin, isAdmin, deleteSchedule)
router.route("/delete-all-schedule").delete(verifyJwtLogin, isAdmin, deleteAllSchedule)

export default router