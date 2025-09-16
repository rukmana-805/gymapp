import mongoose, { Mongoose, Schema } from "mongoose";

const subscriptionSchema = new Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    plan : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Membership",
        required : true
    },
    // noOfClassAttended : {
    //     type : Number,
    //     default : 0
    // },
    startDate : {
        type : Date,
        default : Date.now
    },
    endDate : {
        type : Date,
        required : true
    },
    status: {
        type: String,
        enum: ["Active", "Expired", "Cancelled"],
        default: "Active"
    },
    coupan: {
        type:String
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    }
    
}, {timestamps : true})

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription