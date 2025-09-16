import { useState } from "react";
import LoginSidebar from "../../components/LoginSidebar/LoginSidebar.jsx";
import "../ClassSchedule/ClassSchedule.css";
import axiosInstance from "../../utils/axiosInstance.js";

const ClassSchedule = () => {
  const schedule = {
    Monday: [
      { name: "Yoga Class", time: "06:00 - 07:00 AM" },
      { name: "Weight Training", time: "08:00 - 09:30 AM" },
      { name: "Cardio", time: "05:00 - 06:00 PM" },
    ],
    Tuesday: [
      { name: "Yoga Class", time: "06:00 - 07:00 AM" },
      { name: "Weight Training", time: "09:00 - 10:30 AM" },
      { name: "Cardio", time: "06:00 - 07:00 PM" },
    ],
    Wednesday: [
      { name: "Yoga Class", time: "07:00 - 08:00 AM" },
      { name: "Weight Training", time: "10:00 - 11:30 AM" },
      { name: "Cardio", time: "05:00 - 06:00 PM" },
    ],
    Thursday: [
      { name: "Yoga Class", time: "06:30 - 07:30 AM" },
      { name: "Weight Training", time: "08:30 - 10:00 AM" },
      { name: "Cardio", time: "06:00 - 07:00 PM" },
    ],
    Friday: [
      { name: "Yoga Class", time: "06:00 - 07:00 AM" },
      { name: "Weight Training", time: "09:00 - 10:00 AM" },
      { name: "Cardio", time: "06:30 - 07:30 PM" },
    ],
    Saturday: [
      { name: "Yoga Class", time: "07:00 - 08:00 AM" },
      { name: "Weight Training", time: "10:00 - 11:00 AM" },
      { name: "Cardio", time: "04:00 - 05:00 PM" },
    ],
  };

  // const [day, setDay] = useState("")
  // const [classType, setClassType] = useState("")
  // const [time, setTime] = useState("")

  const [bookingForm, setBookingForm] = useState({
    day : "",
    classType : "",
    timing : ""
  })

  const handleBookingValues = (e) => {
    const {name, value} = e.target
    setBookingForm((prev) => ({
      ...prev,
      [name] : value
    }))
  }

  const BookClass = async () => {
    // console.log(bookingForm.day)
    // console.log(bookingForm.classType)
    // console.log(bookingForm.timing)

    try {
      const {data} = await axiosInstance.post("/users/book-class", {
        day : bookingForm.day,
        classType : bookingForm.classType,
        timing : bookingForm.timing
      })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="class-schedule-parent">
      <LoginSidebar />
      <div className="class-schedule-container">
        <div className="schedule-container">
          <h2 className="schedule-title">
            Weekly <span>Class Schedule</span>
          </h2>
          <div className="class-schedule-flex">
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
        </div>
        <div className="booking-class-container">
          <div className="heading">
            <h1>Book <span>Your Class</span></h1>
          </div>
          <div className="class-form">
            <div className="select-box">
              <span>Select Day</span>
              <select name="day" id="" onChange={handleBookingValues}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>{" "}
            <div className="select-box">
              <span>Class Type</span>
              <select name="classType" id="" onChange={handleBookingValues}>
                <option value="Yoga">Yoga</option>
                <option value="Weight Training">Weight Training</option>
                <option value="Cardio">Cardio</option>
              </select>
            </div>
            <div className="select-box">
              <span>Select Timing</span>
              <select name="timing" id="" onChange={handleBookingValues}>
                <option value="7-8">7-8 AM</option>
                <option value="5-6">5-6 PM</option>
              </select>
            </div>
            <span className="isavailable">Available</span>
            <div className="book-class-button">
                <button onClick={BookClass}>Book Class</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;
