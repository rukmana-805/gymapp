import mongoose, { Schema } from "mongoose";

const equiptmentSchema = new Schema({
    
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true,
        enum : ["Cardio", "Weight Trainning", "Strength", "Others"],
        default : "Others"
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    },
    image : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["Available", "Under Maintenance"],
        default : "Available"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true})

const Equiptment = mongoose.model("Equiptment", equiptmentSchema)

export default Equiptment