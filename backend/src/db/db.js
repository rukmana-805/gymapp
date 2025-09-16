import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = mongoose.connect(process.env.MONGODB_URI, {
            dbName:process.env.DB_NAME
        })
        console.log(`MongoDB Connected : ${(await connectionInstance).connection.host}`)
    } catch (error) {
        console.log("Database Connection Faild")
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB