import cron from "node-cron"
import Subscription from "../models/subscription.model.js"

cron.schedule("0 0 * * *", async () => {

    try {
        
        const currDate = new Date()

        const result = await Subscription.updateMany(
            {
                endDate : {$lt : currDate},
                status : "Active"
            },
            {
                $set : {
                    status : "Expired"
                }
            }
        )

        console.log(`Cron: Subscriptions updated to Expired =>`, result.modifiedCount);

    } catch (error) {
        console.error("Cron error while updating subscriptions:", error.message);
    }
})