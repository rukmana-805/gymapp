import Subscription from "../models/subscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Membership from "../models/membership.model.js"
import User from "../models/user.model.js"


//For User False Payment
const takeSubscription = asyncHandler(async (req, resp) => {

    const { email, plan, month, coupan } = req.body
    if(!email || !plan || !month){
        return resp.status(400).json({meaasge : "Fill the details"})
    }

    const user = await User.findOne({email:email})
    if(!user){
        return resp.status(400).json({meaasge : "User not found"})
    }

    const sub_type = await Membership.findOne({type:plan})
    if(!sub_type){
        return resp.status(400).json({meaasge : "Plan deesn't exist"})
    }

    const currDate = new Date()
    const plan_expire_date = new Date(currDate)
    const month_inp = parseInt(month.substring(0, 1), 10)
    plan_expire_date.setMonth(plan_expire_date.getMonth() + month_inp)

    const paymentStatus = "Paid" // Temporary for now but this can be get from Rozzerpay

    //create subscription
    const subscription = await Subscription.create({
        user:user._id,
        plan:sub_type._id,
        endDate:plan_expire_date,
        coupan:coupan,
        paymentStatus:paymentStatus
    })

    if(!subscription){
        return resp.status(400).json({meaasge : "Subscription failed!"})
    }

    return resp.status(200).json({
        subscription:subscription,
        meaasge : "You have been Successfully Subscribed"
    })
})



// For Admin
const createSubscription = asyncHandler(async (req, resp) => {
    const {} = req.body
    const user_id = req.user._id
})

const getAllSubscription = asyncHandler(async (_, resp) => {
    const subscriptions = await Subscription.find({});
    const totalSubscribedPeople = subscriptions.length;

    resp.status(200).json({
        message: "All subscription fetched successfully",
        subscriptions,
        totalPeople: totalSubscribedPeople
    });
});

const getAllActiveSubscription = asyncHandler(async (_, resp) => {
    const subscriptions = await Subscription.find({status : "Active"});
    const totalSubscribedPeople = subscriptions.length;

    resp.status(200).json({
        message: "All Active subscription fetched successfully",
        subscriptions,
        totalPeople: totalSubscribedPeople
    });
});

const getAllExpiredSubscription = asyncHandler(async (_, resp) => {
    const expiredSubscriptions = await Subscription.find({status : "Expired"});
    const totalExpiredSubscribedPeople = expiredSubscriptions.length;

    resp.status(200).json({
        message: "All Expired subscription fetched successfully",
        expiredSubscriptions,
        totalPeople: totalExpiredSubscribedPeople
    });
});

const getSubscriptionByType = asyncHandler(async (req, resp) => {
    const { type } = req.params;

    const membership = await Membership.findOne({ type });
    if (!membership) {
        return resp.status(404).json({ message: "Membership type not found" });
    }

    const subscriptions = await Subscription.find({ plan: membership._id });
    const totalPeople = subscriptions.length;

    resp.status(200).json({
        message: `${type} Members fetched successfully`,
        subscriptions,
        totalPeople
    });
});

const getActiveSubscriptionByType = asyncHandler( async (req, resp) => {

    const { type } = req.params

    const membership = await Membership.findOne({ type });
    if (!membership) {
        return resp.status(404).json({ message: "Membership type not found" });
    }

    const activeSubscriptions = await Subscription.find({ 
        plan: membership._id,
        status : "Active"
    });
    const totalPeople = activeSubscriptions.length;

    resp.status(200).json({
        message: `${type} Active Members fetched successfully`,
        activeSubscriptions,
        totalPeople
    });
})


const getExpiredSubscriptionByType = asyncHandler( async (req, resp) => {

    const { type } = req.params

    const membership = await Membership.findOne({ type });
    if (!membership) {
        return resp.status(404).json({ message: "Membership type not found" });
    }

    const expiredSubscriptions = await Subscription.find({ 
        plan: membership._id,
        status : "Expired"
    });
    const totalPeople = expiredSubscriptions.length;

    resp.status(200).json({
        message: `${type} Expired Members fetched successfully`,
        expiredSubscriptions,
        totalPeople
    });
})


export {
    takeSubscription,
    createSubscription,
    getAllSubscription,
    getSubscriptionByType,
    getActiveSubscriptionByType,
    getAllActiveSubscription,
    getExpiredSubscriptionByType,
    getAllExpiredSubscription
}