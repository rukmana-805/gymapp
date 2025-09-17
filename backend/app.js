import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import userRouter from "./src/routes/user.router.js"
import membershipRouter from "./src/routes/membershi.router.js"
import equiptmentRouter from "./src/routes/equiptment.router.js"
import trainerRouter from "./src/routes/trainner.router.js"
import scheduleRouter from "./src/routes/schedule.router.js"
import subscriptionRouter from "./src/routes/subscription.router.js"

const app = express()

app.use(cors({
    // origin : "http://localhost:5173",
    origin : ["https://mybackend-3lwb.onrender.com"],
    credentials : true,
    optionsSuccessStatus : 200
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));//for form
app.use(cookieParser())

// E link hit hele ki user ra jen Ruter thiba seta chalba bali kahuche
app.use("/api/users", userRouter)
app.use("/api/admin", membershipRouter)
app.use("/api/admin", equiptmentRouter)
app.use("/api/subscription", subscriptionRouter)
app.use("/api/admin", trainerRouter)
app.use("/api/admin", scheduleRouter)

export {app}



