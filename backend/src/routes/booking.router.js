import { Router } from "express"

import {bookClass, cancelClass} from "../controllers/booking.controller.js"
import verifyJwtLogin from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/book-class").post(verifyJwtLogin, bookClass)
router.route("/cancel-class/:id", verifyJwtLogin, cancelClass)