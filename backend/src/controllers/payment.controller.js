import crypto from "crypto";
import Subscription from "../models/subscription.model.js";
import Membership from "../models/membership.model.js";
import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Order Creation
const createOrder = async (req, resp) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  const order = await razorpayInstance.orders.create(options);

  resp.status(200).json({
    success: true,
    order,
  });
};

const verifyPayment = async (req, resp) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } =
        req.body;
    
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body)
            .digest("hex");
    
        if (expectedSignature !== razorpay_signature) {
            return resp.status(400).json({ message: "Payment verification failed" });
        }
    
        const plan = await Membership.findById(planId)
        const userId = req.user._id 
    
        const durationInMonth = plan.durationInMonth
        const endDate = new Date(Date.now + durationInMonth)
    
        const subscription = await Subscription.create({
            user : userId,
            plan : planId,
            startDate : Date.now,
            endDate : endDate,
            status : "Active",
            paymentStatus : "Paid"
        })
    
        return resp.status(200).json({
            message : "Subscription Successfully",
            subscription
        })

    } catch (error) {
        console.log(error)
        return resp.status(200).json({
            message : "Payment Failed..",
        })
    }

};

export { 
    createOrder, 
    verifyPayment 
};
