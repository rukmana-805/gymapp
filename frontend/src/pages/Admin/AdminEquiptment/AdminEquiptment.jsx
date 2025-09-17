import "../AdminEquiptment/AdminEquiptment.css"
import AdminSidebar from "../AdminSide/AdminSide.jsx"

import edit_icon from "@/assets/edit-icon.png"
import delete_icon from "@/assets/delete-icon.png"
import details_icon from "@/assets/arrow-down.png"
import { useState } from "react"

const AdminEquipment = () => {
    const [eqDetails, setEqDetails] = useState(false)
    const [rotate, setRotate] = useState(true)

    const seeDetailsHandler = () => {
        setEqDetails(!eqDetails)
        setRotate(!rotate)
    }    

    return (
        <div>
            <div className="admin-equipment-container">
                <AdminSidebar />
                <div className="admin-equipment-main">
                    <div className="admin-equipment-title" >
                        <h1>Equipment Management</h1>
                    </div>

                    <div className="equipment-wrapper">
                        <div className="equipment-header">
                            <div className="equipment-count">
                                <p>Total Equipment: 5</p>
                            </div>
                            <div className="equipment-actions">
                                <button className="equipment-add-btn">Add New</button>
                                <button className="equipment-clear-btn">Clear All</button>
                            </div>
                        </div>

                        <div className="equipment-list">
                            <div className="equipment-card">
                                <div className="equipment-summary">
                                    <div className="equipment-name">Treadmill</div>
                                    <div className="equipment-icons">
                                        <img src={edit_icon} alt="Edit" className="equipment-icon" />
                                        <img src={delete_icon} alt="Delete" className="equipment-icon" />
                                        <img 
                                            src={details_icon} 
                                            alt="Details" 
                                            onClick={seeDetailsHandler} 
                                            className={`equipment-icon toggle-icon ${rotate ? "rotate" : ""}`} 
                                        />
                                    </div>
                                </div>

                                <div className={`equipment-details ${eqDetails ? "show" : ""}`}>
                                    <p>Name: Treadmill</p>
                                    <p>Quantity: 4</p>
                                    <p>Condition: Good</p>
                                    <p>Maintenance Date: 20-Aug-2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminEquipment
