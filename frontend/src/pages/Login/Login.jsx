import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import LoginImg from "@/assets/loginimg.jpg";
import axiosInstance from "../../utils/axiosInstance.js";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx"

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLoginInHandle = async () => {
    const { username, password } = formData;

    if (!username || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const resp = await axiosInstance.post("/users/login", {
        username,
        password,
      });

      if(resp?.data?.success){
        alert("User Login Successfully");
        login(resp?.data?.user?.logedInUser)
        if(resp?.data?.user?.logedInUser.role === "user"){
          navigate("/deshboard");
        }
        if(resp?.data?.user?.logedInUser.role === "admin"){
          navigate("/admin-deshboard")
        }
        
      }

    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed. Try again.";
      alert(msg);
    }
  };

  return (
    <div className="login-parent">
      <div className="login-body">
        <img src={LoginImg} alt="login img" />
        <div className="login-content">
          <h1>Login Here</h1>
          <input
            type="text"
            placeholder="Enter your Email"
            name="username"
            value={formData.username}
            onChange={changeHandler}
          />
          <br />
          <input
            type="password"
            placeholder="Enter your Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
          <br />
          <button className="login-button" onClick={userLoginInHandle}>
            Login
          </button>

          <div className="lower-content">
            <div>
              <button>Google</button>
              <button>Apple</button>
            </div>
            <p>
              Don't have an account? <a href="">Sign Up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
