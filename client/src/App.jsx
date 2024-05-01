import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/route";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { createToast } from "./utils/toastifiy";
import { authSelect, setMessageEnpty } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUser } from "./features/auth/authApiSlice";

function App() {
  const dispatch = useDispatch();
  const { error, message } = useSelector(authSelect);

  useEffect(() => {
    if (localStorage.getItem("donarUserLogin")) {
      dispatch(getLoginUser());
    }
  }, [dispatch]);
  // show request messages
  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEnpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEnpty());
    }
  }, [error, message, dispatch]);
  return (
    <>
      <ToastContainer
        style={{ zIndex: 99999 }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
