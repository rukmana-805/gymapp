import mongoose, { Schema } from "mongoose";

const trainnerSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    specialization : {
        type : String,
        required : true
    },
    experienceInYears : {
        type : Number,
        required : true
    },
    profilePic : {
        type : String,
        default : ""
        // required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
    
}, {timestamps : true})

const Trainner = mongoose.model("Trainner", trainnerSchema)

export default Trainner