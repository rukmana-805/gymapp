import axios from "axios"

// console.log("API URL:", process.env.REACT_APP_API_URL);

const axiosInstance = axios.create({
    // baseURL : `${process.env.REACT_APP_API_URL}/api`,
    // baseURL : "http://localhost:3000/api",
    baseURL : `https://mybackend-3lwb.onrender.com/api`,
    withCredentials : true,
    headers : {
        "Content-Type" : "application/json"
    }
})

export default axiosInstance