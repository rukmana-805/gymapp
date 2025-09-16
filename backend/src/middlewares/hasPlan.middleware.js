import Subscription from "../models/subscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const hasPlan = asyncHandler(async (req, resp, next) => {

    const userId = req.user._id

    const subscription = await Subscription.findOne({
        user : userId,
        status: "Active"
    })
    if(!subscription){
        return resp.status(404).json({message : "You don't have any active plan.."})
    }

    req.subscription = subscription
    next()
})

export default hasPlan