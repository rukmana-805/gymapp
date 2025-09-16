import { asyncHandler } from "../utils/asyncHandler.js";
import Membership from "../models/membership.model.js";

const registerPlan = asyncHandler( async (req, resp) => {

    const {type, price, durationInMonth, totalClassPerWeek, features} = req.body

    if(!(type && price && durationInMonth && features && totalClassPerWeek)){
        return resp.status(400).json({message : "Fill all the fields"})
    }

    const existPlan = await Membership.findOne({type})
    if(existPlan){
        return resp.status(400).json({message : "Plan Already Exist"})
    }

    const plan = await Membership.create({
        type,
        price,
        durationInMonth,
        totalClassPerWeek,
        features
    })

    if(!plan){
        return resp.status(400).json({message : "Plan Registration Failed"})
    }

    resp.status(200).json({
        message : "Plan Registered Successfully",
        plan : {plan}
    })
})

const updatePlan = asyncHandler( async (req, resp) => {

    const {type, newprice, newdurationInMonth, newfeatures} = req.body

    const updatedPlan = await Membership.findOneAndUpdate(
        {type : type},
        {
            $set : {
                type : type,
                price : newprice,
                durationInMonth : newdurationInMonth,
                features : newfeatures
            }
        },
        {new : true}
    )

    resp.status(200).json({
        message : "Plan Updated Successfully",
        updatedData : updatedPlan
    })
})

const getAllPlans = asyncHandler(async( _ , resp) => {

    const plans = await Membership.find({})
    if(!plans){
        return resp.status(404).json({message : "There is no plan exist"})
    }

    return resp.status(200).json({
        message : "Plans Fetched Successfully",
        plans : plans
    })
})

const getPlanDetails = asyncHandler(async(req, resp) => {

    const planId = req.params?.id
    const plan = await Membership.findById(planId)

    if(!plan){
        return resp.status(404).json({message : "Plan doesn't exist"})
    }

    return resp.status(200).json({
        message : "Plan details fetched successfully",
        plan : plan
    })
})

const deletePlan = asyncHandler(async(req, resp) => {

    const planId = req.params?.id
    const deletedPlan = await Membership.findByIdAndDelete(planId)
    if(!deletedPlan){
        return resp.status(404).json({message : "Plan not found"})
    }

    return resp.status(200).json({
        message : "Plan deleted successfully",
        deletePlan
    })
})

export {
    registerPlan,
    updatePlan,
    getAllPlans,
    getPlanDetails,
    deletePlan
}