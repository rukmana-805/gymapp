import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {

  const { isLoggedIn, loading } = useAuth()

  if(loading){
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        // state={{ message: "Your are not login yet" }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;

// ye state ko useLocation se access karte hain (Login page mai jake dekho)
