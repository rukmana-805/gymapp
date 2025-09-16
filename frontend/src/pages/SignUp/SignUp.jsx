import "../SignUp/SignUp.css";
import signUpImg from "../../assets/signupimg1.jpg";
import googleIcon from "../../assets/googleicon.png";
import appleIcon from "../../assets/appleicon.png";

import {useNavigate} from "react-router-dom"
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";

const SignUp = () => {

  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    username : "",
    fullName : "",
    password : "",
    email : "",
    phone : "",
    rePassword : "",
    gender : "",
    agree : false,
    age : ""
  })

  const handleChange = (e) => {

    const {name, value, checked, type} = e.target

    setFormData((prev) => ({
      ...prev,
      [name] : type === "checkbox" ? checked : value
    }))

  }

  const handleSignUpUser = async (e) => {

    e.preventDefault()

    const {username, fullName, password, email, phone, rePassword, gender, agree, age} = formData

    if(!username || !fullName || !password || !email || !phone || !rePassword
      || !gender || !age
    ){
      alert("All fields are required")
      return
    }

    if(!agree){
      alert("Please agress with our Term & Conditions")
      return
    }

    if(password !== rePassword){
      alert("Re-password doesn't match the password")
      return
    }

    try {
      const resp = await axiosInstance.post("/users/register", {
        username,
        fullName,
        password,
        email,
        phone,
        gender,
        age
      })
  
      if(resp?.data?.success){
        navigate("/profile-upload");
        alert("User registred successfully")
      }else{
        alert(resp.data.message || "Registration failed")
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
    
  }

  // const nagivateTo = () => {
  //   navigate("/profile-upload");
  // }

  return (
    <div className="signup-parent">
      <div className="signup-body">
        <img src={signUpImg} alt="login img" />
        
        <form className="signup-content" onSubmit={handleSignUpUser}>
          <h1>Sign Up Here</h1>
          <div className="input-flex">
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
          </div>
          <input className="input-100" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <br />
          <input className="input-100" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <div className="input-flex">
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <input type="text" name="rePassword" value={formData.rePassword} onChange={handleChange} placeholder="Re-Enter Password" />
          </div>
          <div className="input-flex-select">
            <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
            <select name="gender" id="" value={formData.gender} onChange={handleChange}>
              <option value="" className="select">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>{" "}
            <br />
          </div>
          <div className="checkbox">
            <input type="checkbox" id="agree" name="agree" checked={formData.checked} onChange={handleChange}></input>
            <label htmlFor="agree">I agree to the <a href="">@Term & condition</a></label>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
          <div className="signup-lower">
            <div className="btn"><img src={googleIcon} alt="" />Google</div>
            <div className="btn"><img src={appleIcon} alt="" />Apple</div>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default SignUp;
