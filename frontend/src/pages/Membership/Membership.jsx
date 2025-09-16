import { useState } from "react";
import LoginSidebar from "../../components/LoginSidebar/LoginSidebar";
import Pricing from "../../components/Pricing/Pricing.jsx";
import "../Membership/Membership.css";

const Membership = () => {

  const [showMemberhip, setShowMembership] = useState(false)
  

  return (
    <div className="membership-login-parent">
      <LoginSidebar />

        {showMemberhip && <div className="membership-plans-popup"><Pricing mode="pop-up" onClose={()=>{setShowMembership(false)}}/></div>}

      <div className="membership-login-container">
        <div className="membership-heading">
          <h1>
            Welcome to <span>Membership Plan</span>
          </h1>
          <p className="membership-subtext">Manage your gym plans and upgrade anytime!</p>
        </div>

        <div className="selected-plan">
          <table className="membership-table">
            <thead>
              <tr>
                <th>Plan Type</th>
                <th>Price (₹)</th>
                <th>Features</th>
                <th>No. of Classes</th>
                <th>Plan Status</th>
                <th>Payment Status</th>
                <th>Upgrade Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gold</td>
                <td>₹500</td>
                <td className="membership-features">
                  <ul>
                    <li>Gym Access</li>
                    <li>Weight Training</li>
                    <li>Fitness Classes</li>
                  </ul>
                </td>
                <td>4</td>
                <td>
                    <span className="status-success">Active</span>
                </td>
                <td>
                  <span className="status-success">Success</span>
                </td>
                <td>
                  <button className="upgrade-btn" onClick={()=>setShowMembership(true)}>Upgrade</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Membership;
