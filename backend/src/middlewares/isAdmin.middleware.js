import { asyncHandler } from "../utils/asyncHandler.js";

const isAdmin = asyncHandler(async (req, resp, next) => {

    try {
        if(req.user?.role !== "admin"){
            return resp.status(403).json({message : "Access denied. Admin only."})
        }
    
        next()
    } catch (error) {
        console.error(error)
        console.log("IsAdmin Middleware Error", error)
    }
})

export default isAdmin