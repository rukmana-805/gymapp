import "react-image-crop/dist/ReactCrop.css";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Schedule from "./pages/Schedule/Schedule.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import ProfileUploadPage from "./pages/ProfileUpload/ProfileUpload.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Deshboard from "./pages/Deshboard/Dashboard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ClassSchedule from "./pages/ClassSchedule/ClassSchedule.jsx";
import Membership from "./pages/Membership/Membership.jsx";
import AdminDeshboard from "./pages/Admin/AdminDeshboard/AdminDeshboard.jsx";
import AdminMembership from "./pages/Admin/AdminMembership/AdminMembership.jsx";
import AdminSchedule from "./pages/Admin/AdminSchedule/AdminSchedule.jsx";
import AdminEquipment from "./pages/Admin/AdminEquiptment/AdminEquiptment.jsx";
import PaymentForm from "./components/Payment/Payment.jsx";
import AdminTrainer from "./pages/Admin/AdminTrainer/AdminTrainer.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Visit context for know about AuthProvider */}
        <AuthProvider> 
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/payment" element={<PaymentForm/>} />

            <Route path="/admin-deshboard" element={<AdminDeshboard />} />
            <Route path="/admin-membership" element={<AdminMembership />} />
            <Route path="/admin-schedule" element={<AdminSchedule />} />
            <Route path="/admin-trainer" element={<AdminTrainer />} />
            <Route path="/admin-equiptment" element={<AdminEquipment />} />

            {/* Protected Routes */}

            <Route
              path="/profile-upload"
              element={
                <ProtectedRoute>
                  <ProfileUploadPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/deshboard"
              element={
                <ProtectedRoute>
                  <Deshboard />
                </ProtectedRoute>
              }
            />
            
            <Route 
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route 
              path="/class-schedule"
              element={
                <ProtectedRoute>
                  <ClassSchedule />
                </ProtectedRoute>
              }
            />

            <Route 
              path="/membership"
              element={
                <ProtectedRoute>
                  <Membership />
                </ProtectedRoute>
              }
            />

          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
