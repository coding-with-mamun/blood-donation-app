import patient from "../../assets/frotend/img/aviator/patient.jpg";
import donor from "../../assets/frotend/img/aviator/blood-donor.png";
import admin from "../../assets/frotend/img/aviator/admin.jpg";
import { authSelect } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const Avatar = ({ url }) => {
  const { auth } = useSelector(authSelect);

  console.log(auth);

  let avatar = "";

  if (auth.role === "patient") {
    avatar = patient;
  } else if (auth.role === "donor") {
    avatar = donor;
  } else if (auth.role === "admin") {
    avatar = admin;
  }

  return (
    <>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        src={url ? url : avatar}
        alt=""
      />
    </>
  );
};

export default Avatar;
