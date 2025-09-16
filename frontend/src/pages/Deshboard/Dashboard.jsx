import React from "react";
import "../Deshboard/Deshboard.css";
import LoginSidebar from "../../components/LoginSidebar/LoginSidebar.jsx";
import ProgressBar from "@ramonak/react-progress-bar";

import { useAuth } from "../../context/AuthContext.jsx"

const Deshboard = () => {
  
  const { user } = useAuth()

  return (
    <div className="deshboard-parent">
      <LoginSidebar />

      <div className="user-deshboard">
        <h2>Hi {user.fullName} 👋</h2>

        {/* Membership Summary */}
        <div className="membership-summary">
          <h3>Membership : <span>Gold</span></h3>
          <p>Valid Till : <strong>30 Aug 2025</strong></p>
          <p>Next Class : <strong>Cardio with Rahul at 5:00 PM</strong></p>
        </div>

        {/* Weekly Attendance Progress */}
        <div className="progress-section">
          <h3>Gym Attendance</h3>
          <ProgressBar
            completed={22}
            maxCompleted={30}
            bgColor="#f4a100"
            baseBgColor="#ddd"
            height="20px"
            labelAlignment="outside"
            animateOnRender={true}
          />
          <p className="progress-text">22 / 30 sessions attended</p>
        </div>
        <div className="progress-section">
          <h3>Total classes Attendance</h3>
          <ProgressBar
            completed={2}
            maxCompleted={6}
            bgColor="#f4a100"
            baseBgColor="#ddd"
            height="20px"
            labelAlignment="outside"
            animateOnRender={true}
          />
          <p className="progress-text">2 / 6 sessions attended</p>
        </div>

        {/* Upcoming Classes */}
        <div className="upcoming-classes">
          <h3>Upcoming Classes</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Time</th>
                <th>Trainer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5 Jul</td>
                <td>Zumba</td>
                <td>6:00 PM</td>
                <td>Simran</td>
              </tr>
              <tr>
                <td>6 Jul</td>
                <td>Weight Lifting</td>
                <td>7:00 PM</td>
                <td>Rohit</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button>Book New Class</button>
            <button>View Schedule</button>
            <button>Download Invoice</button>
            <button>Membership Details</button>
          </div>
        </div>

        {/* Notification */}
        <div className="notification-box">
          <p>⚠️ Your membership will expire in 5 days!</p>
        </div>
      </div>
    </div>
  );
};

export default Deshboard;
