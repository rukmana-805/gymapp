import "../AdminMembership/AdminMembership.css"
import AdminSidebar from "../AdminSide/AdminSide.jsx"

import edit_mem_icon from "../../../assets/edit-icon.png"
import delete_mem_icon from "../../../assets/delete-icon.png"
import details_mem_icon from "../../../assets/arrow-down.png"
import { useState } from "react"

const AdminMembership = () => {

    const [memDetails, setMemDetails] = useState(false)
    const [rotate, setRotate] = useState(true)

    const seeDetailsHandler = () => {
        setMemDetails(!memDetails)
        setRotate(!rotate)
        console.log("Seet Details")
    }

    return(
        <div>
            <div className="admin-membership">
                <AdminSidebar />
                <div className="admin-membership-content">
                    <div className="admin-membership-heading"><h1>This is Admin Membership</h1></div>
                    <div className="membership-box">
                        <div className="membership-top">
                            <div className="item-size">
                                <p>No of item 3</p>
                            </div>
                            <div className="add-membership-icon">
                                <div className="add-button"><button>Add New</button></div>
                                <div className="clear-mem-btn"><button>Clear All</button></div>
                            </div>
                        </div>

                        <div className="membership-items-box">
                            <div className="item-with-paragraph">
                                <div className="mem-items">
                                    <div className="membership-type"><span>Gold</span></div>
                                    <div className="membership-item-icons">
                                        <div className="edit-membership"><img src={edit_mem_icon} alt="edit-icon" /></div>
                                        <div className="delete-membership"><img src={delete_mem_icon} alt="delete-icon" /></div>
                                        <div onClick={seeDetailsHandler} className="see-membersip"><img className={`${rotate ? "rotate" : ""}`} src={details_mem_icon} alt="see-details" /></div>
                                    </div>
                                </div>
                                <div className={`mem-paragraph ${memDetails ? "visible" : ""}`}>
                                    <span>Plan : Gold</span><br />
                                    <span>Price : $200</span><br />
                                    <span>Features : Basic Gym access, Trainner, 4 Classes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMembership