import { useSelector } from "react-redux";
import { authSelect } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivareGard = () => {
  const { auth } = useSelector(authSelect);

  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivareGard;
