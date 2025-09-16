import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import verifyJwtLogin from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-order", verifyJwtLogin, createOrder);
router.post("/verify-payment", verifyJwtLogin, verifyPayment);

export default router;
