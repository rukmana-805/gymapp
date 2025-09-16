import Booking from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Subscription from "../models/subscription.model.js";
import Schedule from "../models/schedule.model.js"
import Membership from "../models/membership.model.js"

// const bookClass = asyncHandler(async (req, resp) => {

//     const userId = req.user._id
//     const {subscription_id, schedule_id, className} = req.body

//     if(!subscription_id || !schedule_id || !className){
//         return resp.status(400).json({message : "plzz select plan"})
//     }

//     const subscription = await Subscription.findById(subscription_id)
//     if(subscription.status === "Active"){
//         return resp.status(400).json({message : "Your subscription plan expired"})
//     }

//     const planId = subscription.plan
//     const membership = await Membership.findById(planId)

//     const totalAllowedClasses = membership.totalClassPerWeek

//     const startOfWeek = new Date()
//     startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
//     startOfWeek.setHours(0, 0, 0, 0)

//     const endOfWeek = new Date(startOfWeek)
//     endOfWeek.setDate(endOfWeek.getDate() + 6)
//     endOfWeek.setHours(23, 59, 59, 999);

//     const bookingThisWeek = await Booking.countDocuments({
//         user : userId,
//         bookingDate : {
//             $gte : startOfWeek,
//             $lte : endOfWeek
//         }
//     })

//     if(bookingThisWeek > totalAllowedClasses){
//         return resp.status(403).json({
//             message: "Booking limit exceeded for this week. Upgrade your plan or wait until next week."
//         })
//     }

//     const schedule = await Schedule.findById(schedule_id)
//     if(!schedule){
//         return resp.status(400).json({message : "Please select a valid schedule"})
//     }

//     const scheduleClass = schedule.classes.find((cls) => cls.name === className)
//     if(!scheduleClass){
//         return resp.status(400).json({message : "No such class found"})
//     }

//     const booking = await Booking.create({
//         user : userId,
//         subscription : subscription_id,
//         schedule : schedule_id,
//         className,
//         status : "Confirmed"
//     })

//     if(!booking){
//         return resp.status(401).json({message : "Booking failed"})
//     }

//     return resp.status(400).json({
//         message : "Class Booked Successfully",
//         booking
//     })
// })

const bookClass = asyncHandler(async (req, resp) => {

    const {day, classType, timing} = req.body

    //Check Schedule Present or not
    const hasSchedule = await Schedule.findOne({
        day,
        classes : {
            $elemMatch : {
                name : classType,
                startTime : timing.start,
                endTime : timing.end
            }
        }
    })

    if(!hasSchedule){
        return resp.status(200).json({
            message : "No  such Schedule found"
        })
    }

    // Chcking available classes
    const subscription_id = req.subscription._id
    const subscription = await Subscription.findById(subscription_id)

    const plan = subscription.plan
    const membership = await Membership.findOne({type:plan})

    const allowedClasses = membership.totalClassPerWeek
    
    // Week calculation
    const startOfWeek = new Date()
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const userId = req.user._id
    const bookingThisWeek = await Booking.countDocuments({
        user : userId,
        bookingDate : {
            $gte : startOfWeek,
            $lte : endOfWeek
        }
    })

    if(bookingThisWeek >= allowedClasses){
        return resp.status(400).json({
            message : "Your Class Limit for this week has been exceed"
        })
    }

    const booking = Booking.create({
        user : userId,
        subscription : subscription_id,
        schedule : hasSchedule._id,
        className : classType,
        status : "Confirmed"
    })

    if(!booking){
        return resp.status(401).json({message : "Booking failed"})
    }

    return resp.status(200).json({
        message : "Class Booked Successfully",
        booking
    })
})

const cancelClass = asyncHandler(async (req, resp) => {

    const bookingId = req.params.id
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId)
    if(!booking){
        return resp.status(404).json({message : "Bookig not found"})
    }

    if (booking.user.toString() !== userId.toString()) {
        return resp.status(403).json({ message: "Unauthorized" });
    }

    booking.status = "Cancelled"
    await booking.save({validateBeforeSave : false})

    resp.status(200).json({
        message: "Booking cancelled successfully",
        booking,
    });
})

export {
    bookClass,
    cancelClass
}