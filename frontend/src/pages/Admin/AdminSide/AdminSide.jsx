import "../AdminSide/AdminSide.css"
import emptyProfile from "@/assets/emptyprofile.png"
import { useNavigate, NavLink } from "react-router-dom"

const AdminSidebar = () => {
    return (
        <div className="login-sidebar-parent">
            <div className="login-sidebar">
                <div className="sidebar-profile-section">
                    <div className="sidebar-profille-image">
                        <img src={emptyProfile} alt="sidebar-profile" />
                    </div>
                <h3>Akash</h3>  
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li className="deshboard"><NavLink to="/admin-deshboard" className="nav-link-login">Deshboard</NavLink></li>
                        <li><NavLink to="/admin-profile" className="nav-link-login">Profile</NavLink></li>
                        <li><NavLink to="/admin-schedule" className="nav-link-login">Schedule</NavLink></li>
                        <li><NavLink to="/admin-trainer" className="nav-link-login">Trainer</NavLink></li>
                        <li><NavLink to="/admin-membership" className="nav-link-login">Membership</NavLink></li>
                        <li><NavLink to="/admin-equiptment" className="nav-link-login">Equiptment</NavLink></li>
                        <li><NavLink to="/admin-subscription" className="nav-link-login">Subscription</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar