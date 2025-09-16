import mongoose, {Schema} from "mongoose";

const membershipSchema = new Schema({

    type : {
        type : String,
        enum : ["Platinum", "Gold", "Silver"],
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    durationInMonth : {
        type : Number,
        required : true
    },
    totalClassPerWeek : {
        type : Number,
        required : true
    },
    features : {
        type : [String],
        required : true
    }
    
}, { timestamps : true})

const  Membership = mongoose.model("Membership", membershipSchema)

export default Membership