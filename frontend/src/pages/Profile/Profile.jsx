import "../Profile/Profile.css"
import emptyProfile from "../../assets/emptyprofile.png"
import LoginSidebar from "../../components/LoginSidebar/LoginSidebar.jsx"
import Pencil from "@/assets/pencil.png"
import { useAuth } from "../../context/AuthContext.jsx"

import { useNavigate } from "react-router-dom"

const Profile = () => {

    const navigate = useNavigate()
    const { user } = useAuth()

    const handleEdit = () => {
        navigate("/profile-upload")
    }

    return(
        <div className="user-profile-parents-parent">
            <LoginSidebar />
            <div className="user-profile-parent">
                <div className="user-profile">
                    <div className="profile-picture">
                        <div className="user-img">
                            <div className="image-profile-container">
                                <img src={user.profilePic} className="profile-user" alt="User Image" />
                            </div>
                            <div onClick={handleEdit} className="edit-icon"><img src={Pencil} alt="edit-pencil" /></div>
                        </div>
                        <div className="username">
                            <h2>Welcome {user.fullName?.split(" ")[0]}</h2>
                        </div>
                    </div>
                    <div className="profile-user-details">
                        <ul>
                            <li><span>Username</span><span className="each-detail">{user.username}</span></li>
                            <li><span>Full Name</span><span className="each-detail">{user.fullName}</span></li>
                            <li><span>Email</span><span className="each-detail">{user.email}</span></li>
                            <li><span>Mobile</span><span className="each-detail">{user.phone}</span></li>
                            <li><span>Gender</span><span className="each-detail">{user.gender}</span></li>
                            <li><span>Age</span><span className="each-detail">{user.age}</span></li>
                        </ul>
                        <div className="edit-details">
                            <button>Edit Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile