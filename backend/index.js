import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./src/db/db.js"

import "./src/cornJob/subscriptionStatusUpdate.js" // Check subscription expired or not every day

dotenv.config({
    path : "./env"
})

const port = process.env.PORT || 5000

connectDB()
app.listen(port, () => {
    console.log(`Server Listing at port no ${port}`)
})

