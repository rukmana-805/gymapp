import React from "react";
import "../Schedule/Schedule.css"

const schedule = {
  Monday: [
    { name: "Yoga", time: "06:00 AM - 07:00 AM" },
    { name: "Weight Training", time: "08:00 AM - 09:30 AM" },
    { name: "Cardio", time: "05:00 PM - 06:00 PM" },
  ],
  Tuesday: [
    { name: "Yoga", time: "06:00 AM - 07:00 AM" },
    { name: "Weight Training", time: "09:00 AM - 10:30 AM" },
    { name: "Cardio", time: "06:00 PM - 07:00 PM" },
  ],
  Wednesday: [
    { name: "Yoga", time: "07:00 AM - 08:00 AM" },
    { name: "Weight Training", time: "10:00 AM - 11:30 AM" },
    { name: "Cardio", time: "05:00 PM - 06:00 PM" },
  ],
  Thursday: [
    { name: "Yoga", time: "06:30 AM - 07:30 AM" },
    { name: "Weight Training", time: "08:30 AM - 10:00 AM" },
    { name: "Cardio", time: "06:00 PM - 07:00 PM" },
  ],
  Friday: [
    { name: "Yoga", time: "06:00 AM - 07:00 AM" },
    { name: "Weight Training", time: "09:00 AM - 10:00 AM" },
    { name: "Cardio", time: "06:30 PM - 07:30 PM" },
  ],
  Saturday: [
    { name: "Yoga", time: "07:00 AM - 08:00 AM" },
    { name: "Weight Training", time: "10:00 AM - 11:00 AM" },
    { name: "Cardio", time: "04:00 PM - 05:00 PM" },
  ],
};

const Schedule = () => {
  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Weekly <span>Class Schedule</span></h2>
      {Object.entries(schedule).map(([day, classes]) => (
        <div className="day-section" key={day}>
          <h3 className="day-heading">{day}</h3>
          <div className="class-list">
            {classes.map((cls, idx) => (
              <div className="class-item" key={idx}>
                <span className="class-name">{cls.name}</span>
                <span className="class-time">{cls.time}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
