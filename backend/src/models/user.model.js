import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    gender : {
        type : String,
        enum : ["Male", "Female", "Others"]
    },
    age : {
        type : Number
    },
    password : {
        type : String,
        required : true
    },
    // membership : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "Membership"
    // },
    isActive : {
        type : Boolean,
        default : true
    },
    profilePic : {
        type : String,
        default : ""
    },
    role : {
        type : String,
        enum : ["user", "admin"],
        default : "user"
    },
    refreshToken : {
        type : String,
        default : ""
    }

}, {timestamps : true})


userSchema.methods.generateRefreshToken = function()  {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema)

export default User
