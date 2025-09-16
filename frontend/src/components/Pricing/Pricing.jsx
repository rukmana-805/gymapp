import { useEffect, useState } from "react";
import "../Pricing/Pricing.css";

import axiosInstance from "../../utils/axiosInstance.js";
import CancleButton from "../../assets/canclebutton.png";
import { useNavigate } from "react-router-dom";

const Pricing = ({mode = "page", onClose}) => {

  const navigate = useNavigate()

  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/get-all-plan");
      console.log(data.plans);
      setPlans(data.plans);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // const handlePurchase = () => {
    
  // }

  return (
    <div className="pricing-parent">
      {/* <div className="cancle-box"></div> */}
      {mode === "pop-up" && <img src={CancleButton} onClick={onClose} className="cancle-box" alt="cancle-box" />}
      <div className="pricing-content">
        <button>GYM PRICING PLAN</button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          accusantium consectetur rerum repellendus dolorem necessitatibus aut
          nam vero hic dolore.
        </p>
      </div>
      <div className="plan">
        {plans.map((plan, index) => (
          <div className="price-box" key={index}>
            <h3>{plan.type}</h3>
            <h1>
              {plan.price}<label className="per-month">/month</label>
            </h1>
            <ul>
              <li>{plan.features[0]}</li>
              <li>{plan.features[1]}</li>
              <li className={`${index == 0 ? `not-available` : ``}`}>Yoga</li>
              <li className={`${index == 0 ? `not-available` : ``}`}>Diet</li>
              <li className={`${index == 0 || index == 1 ? `not-available` : ``}`}>Body Building Trainer</li>
            </ul>
            <button onClick={() => {navigate("/payment", {state : {subscription : plan.type}})}}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
