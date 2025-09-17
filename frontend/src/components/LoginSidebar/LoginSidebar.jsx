import "../LoginSidebar/LoginSidebar.css"
import emptyProfile from "@/assets/emptyprofile.png"
import { useNavigate, NavLink } from "react-router-dom"

const LoginSidebar = () => {

    const navigate = useNavigate()

    return(
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
                        <li className="deshboard"><NavLink to="/deshboard" className="nav-link-login">Deshboard</NavLink></li>
                        <li><NavLink to="/profile" className="nav-link-login">Profile</NavLink></li>
                        <li><NavLink to="/class-schedule" className="nav-link-login">Schedule</NavLink></li>
                        <li><NavLink to="/membership" className="nav-link-login">Membership</NavLink></li>
                        <li><NavLink to="/payment-history" className="nav-link-login">Payment History</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LoginSidebar