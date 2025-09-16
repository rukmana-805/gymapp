import {Router} from "express"
import verifyJwtLogin from "../middlewares/auth.middleware.js"
import isAdmin from "../middlewares/isAdmin.middleware.js"
import {
    takeSubscription,
    getAllSubscription,
    getSubscriptionByType,
    getActiveSubscriptionByType,
    getAllActiveSubscription,
    getExpiredSubscriptionByType,
    getAllExpiredSubscription
}
 from "../controllers/subscription.controller.js"

const router = Router()

router.route("/take-subscription").post(verifyJwtLogin, takeSubscription)
router.route("/get-all-subscription").get(verifyJwtLogin, isAdmin, getAllSubscription)
router.route("/get-all-active-subscription").get(verifyJwtLogin, isAdmin, getAllActiveSubscription)
router.route("/get-all-expired-subscription").get(verifyJwtLogin, isAdmin, getAllExpiredSubscription)
router.route("/get-type-subscription/:type").get(verifyJwtLogin, isAdmin, getSubscriptionByType)
router.route("/get-active-type-subscription/:type").get(verifyJwtLogin, isAdmin, getActiveSubscriptionByType)
router.route("/get-expired-type-subscription/:type").get(verifyJwtLogin, isAdmin, getExpiredSubscriptionByType)

export default router