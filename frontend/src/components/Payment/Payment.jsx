import React, { useEffect, useState } from "react";
import "../Payment/Payment.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";

const PaymentForm = () => {

  const { user } = useAuth();
  const location = useLocation()

  const subscription = location.state?.subscription

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan : "",
    subscription: "1_month",
    coupon: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.email || "",
        plan: subscription || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resp = await axiosInstance.post("/subscription/take-subscription", {
      email:formData.email,
      plan:formData.plan,
      month:formData.subscription,
      coupon:formData.coupon
    })
    console.log(resp)
    //alert("Form Submitted Successfully!");
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Gym Membership Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Plan Type */}
        <div className="form-group">
          <label>Plan Type</label>
          <input
            type="text"
            name="plan"
            placeholder="Plan Type"
            value={formData.plan}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        {/* <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Address */}
        {/* <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div> */}

        {/* Subscription Plan */}
        <div className="form-group">
          <label>Choose Subscription</label>
          <select
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
          >
            <option value="1_month">1 Month - $50</option>
            <option value="2_months">2 Months - $90</option>
            <option value="1_year">1 Year - $400</option>
          </select>
        </div>

        {/* Coupon Code */}
        <div className="form-group">
          <label>Coupon Code (Optional)</label>
          <input
            type="text"
            name="coupon"
            placeholder="Enter coupon code"
            value={formData.coupon}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="payment-btn">
          Proceed to Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
