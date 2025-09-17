import "../Header/Header.css";
import Logo from "@/assets/gymlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";

const Header = () => {

  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {

    try {
      const resp = await axiosInstance.post("/users/logout")
  
      if(resp?.data?.success){
        logout()
        navigate("/")
      }
    } catch (error) {
      console.error(error?.responce?.data?.message)
      alert(error?.responce?.data?.message)
    }
  }

  return (
    <>
      <div className="nav-bar">
        <div>
          <img className="logo" src={Logo} alt="logo" />
        </div>
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/schedule" className="nav-link">Schedule</Link></li>
          <li>Subscription</li>
          <li><a href="#footer">Contact Us</a></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
        </ul>
        <div className="nav-btn">
          <button><Link to="/signup" className="nav-link">Sign Up</Link></button>
          {
            isLoggedIn ? <button onClick={handleLogout}><Link to="/logout" className="nav-link">Logout</Link></button> : <button><Link to="/login" className="nav-link">Sign In</Link></button>
          }
        </div>
      </div>
    </>
  );
};

export default Header;
