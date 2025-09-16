import mongoose, {Schema} from "mongoose";

const classSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    },
    trainer : {
        // type : mongoose.Schema.Types.ObjectId,
        // ref : "Trainner"
        type : String,
        require : true
    }
})

const scheduleSchema = new Schema({
    day : {
        type : String,
        required : true,
        enum : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    classes : [classSchema]
}, {timestamps : true})

const Schedule = mongoose.model("Schedule", scheduleSchema)

export default Schedule