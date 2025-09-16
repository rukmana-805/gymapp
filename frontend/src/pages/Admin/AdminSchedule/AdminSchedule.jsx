import "../AdminSchedule/AdminSchedule.css";
import AdminSidebar from "../AdminSide/AdminSide";
import { useEffect, useState } from "react";
import delete_mem_icon from "../../../assets/delete-icon.png";
import axiosInstance from "../../../utils/axiosInstance.js";

const AdminSchedule = () => {

  const [showCaseSchedule, setShowCaseSchedule] = useState([
    {
      id:"1",
      day: "Monday",
      time: "7:00 AM - 8:00 AM",
      className: "Zumba",
      trainer: "Raj Sharma",
    },
    {
      id:"2",
      day: "Tuesday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      day: "Wednesday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      id:"3",
      day: "Thursday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      id:"4",
      day: "Friday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      id:"5",
      day: "Saturday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
  ]);
  const [scheduleList, setScheduleList] = useState([
    {
      id:"1",
      day: "Monday",
      time: "7:00 AM - 8:00 AM",
      className: "Zumba",
      trainer: "Raj Sharma",
    },
    {
      id:"2",
      day: "Tuesday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      day: "Wednesday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      id:"3",
      day: "Thursday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      id:"4",
      day: "Friday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
    {
      id:"5",
      day: "Saturday",
      time: "6:00 PM - 7:00 PM",
      className: "Yoga",
      trainer: "Priya",
    },
  ]);

  const [showEditSchedule, setShowEditSchedule] = useState(false);

  const handleEditNowSchedule = () => {
    if(scheduleList.length === 0){
      setScheduleList(showCaseSchedule)
    }
    setShowEditSchedule(true);
  };

  const handleClosePopup = () => {
    setShowEditSchedule(false);
  };

  const handleScheduleFormSubmit = async (e) => {
    e.preventDefault();

    console.log(scheduleList)
    const { data } = await axiosInstance.post("/admin/add-schedule", {
      scheduleList: scheduleList,
    });
    if(data?.success){
      alert("Schedule Added Successfully")
      await getAllSchedule();
      setShowEditSchedule(false)
    }else{
      alert("Error while adding Schedule")
      setShowEditSchedule(false)
    }
  };

  const getAllSchedule = async () => {
    const { data } = await axiosInstance.get("/admin/get-schedule")
    const fetchList = data.schedule

    const newScheduleList = []
    
    for(let i=0; i<fetchList.length; i++){
      const classDetails = fetchList[i].classes[0]
      
      // console.log(classDetails.trainer)
      // const tempTrainer = await axiosInstance.post("/admin/get-trainerby-id",{
      //   trainer_id : classDetails.trainer
      // })

      const tempschedule = {
        id : fetchList[i]._id,
        day : fetchList[i].day,
        className : classDetails.name,
        time : `${classDetails.startTime} - ${classDetails.endTime}`,
        trainer : classDetails.trainer
      }

      newScheduleList.push(tempschedule)
    }
    setScheduleList(newScheduleList)
  }

  // const handleDeleteClass = async ( id ) => {
  //   console.log(id)

  // }

  const handleClearSchedule = async () => {
    try {
      const { data } = await axiosInstance.delete("/admin/delete-all-schedule")
      if(data.success){
        alert(data.message)
        getAllSchedule()
      }else{
        alert(data.message)
        getAllSchedule()
      }
    } catch (error) {
      console.error("Eror while deleteing Schedule",error)
      console.log(error)
    }
  }

  useEffect(() => {
    getAllSchedule()
  }, [])

  return (
    <div className="admin-schedule-page">
      <AdminSidebar />
      <div className="admin-schedule-content">
        <h2>This is Admin Schedule</h2>
        <div className="schedule-header">
          <span>No of Schedules: {scheduleList.length}</span>
          <div className="schedule-buttons">
            <button onClick={handleEditNowSchedule}>Edit Now</button>
            <button onClick={handleClearSchedule}>Clear All</button>
          </div>
        </div>

        {scheduleList.map((item, index) => (
          <div key={index} className="schedule-card">
            <div>
              <strong>{item.day}</strong> — {item.className} <br />
              <small>
                {item.time} | Trainer: {item.trainer}
              </small>
            </div>
            <div className="schedule-actions">
              {/* <button>✏️</button> */}
              {/* <button className="delete-icon-schedule">
                <img onClick={()=>handleDeleteClass(item.id)} src={delete_mem_icon} alt="delete-icon" />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* Blur Overlay */}
      {showEditSchedule && (
        <div className="blur-overlay" onClick={handleClosePopup}></div>
      )}

      {/* Pop Up form */}
      {showEditSchedule && (
        <div className="pop-up-schedule-edit">
          <div className="schedule-form">
            <form onSubmit={handleScheduleFormSubmit}>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Class Type</th>
                    <th>Timing</th>
                    <th>Trainer</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.day}</td>
                      <td>
                        <select value={item.className} onChange={(e)=>{
                          const updatedList = [...scheduleList]
                          updatedList[index].className = e.target.value
                          setScheduleList(updatedList)
                        }} >
                          <option value="">-- Select Class --</option>
                          <option value="Yoga">Yoga</option>
                          <option value="Weight Training">
                            Weight Training
                          </option>
                          <option value="Cardio">Cardio</option>
                          <option value="Zumba">Zumba</option>
                        </select>
                      </td>
                      <td>
                        <select value={item.time} onChange={(e) => {
                          const updatedList = [...scheduleList]
                          updatedList[index].time = e.target.value
                          setScheduleList(updatedList)
                        }} >
                          <option value="">-- Select Time --</option>
                          <option value="7:00 AM - 8:00 AM">
                            7:00 AM - 8:00 AM
                          </option>
                          <option value="7:00 PM - 8:00 PM">
                            7:00 PM - 8:00 PM
                          </option>
                          <option value="6:00 PM - 7:00 PM">
                            6:00 PM - 7:00 PM
                          </option>
                          <option value="9:00 AM - 10:00 AM">
                            9:00 AM - 10:00 AM
                          </option>
                        </select>
                      </td>
                      <td>
                        <select value={item.trainer} onChange={(e) => {
                          const updatedList = [...scheduleList]
                          updatedList[index].trainer = e.target.value
                          setScheduleList(updatedList) 
                        }} >
                          <option value="">-- Select Trainer --</option>
                          <option value="Raj Sharma">Raj Sharma - WT</option>
                          <option value="Akash Dhar">Akash Dhar - Yoga</option>
                          <option value="Abhishek Dhar">
                            Abhishek Dhar - Cardio
                          </option>
                          <option value="Ansh Raj">Ansh Raj - Zumba</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mc-sbtn">
                <button className="make-chnages-schedule" type="submit">
                  Make Changes
                </button>
                <button
                  className="cancel-edit-schedule"
                  type="button"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
