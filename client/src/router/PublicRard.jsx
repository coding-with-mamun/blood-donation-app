import { useSelector } from "react-redux";
import { authSelect } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PublicRard = () => {
  const { auth } = useSelector(authSelect);

  if (localStorage.getItem("donarUserLogin")) {
    return auth ? <Navigate to="/dashboard" /> : <Outlet />;
  } else {
    return <Outlet />;
  }
};

export default PublicRard;
