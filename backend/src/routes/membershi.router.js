import {Router} from "express"

import verifyJwtLogin from "../middlewares/auth.middleware.js"
import { deletePlan, getAllPlans, getPlanDetails, registerPlan, updatePlan } from "../controllers/membership.controller.js"
import isAdmin from "../middlewares/isAdmin.middleware.js"

const router = Router()

// Secure Route
router.route("/create-plan").post(verifyJwtLogin, isAdmin, registerPlan)
router.route("/update-plan").put(verifyJwtLogin, isAdmin, updatePlan)
router.route("/get-all-plan").get(getAllPlans)
router.route("/get-plan-details/:id").get(verifyJwtLogin, isAdmin, getPlanDetails)
router.route("/delete-plan/:id").delete(verifyJwtLogin, isAdmin, deletePlan)

export default router