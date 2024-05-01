import express from "express";
import {
  accountActivationByOtp,
  registerAuth,
  userLogin,
  getLoggedInUser,
  userLogout,
} from "../controllers/authController.js";
import tokenVerify from "../middleware/tokenVerify.js";

// init router dorm express
const router = express.Router();

// routing
router.post("/register", registerAuth);
router.post("/login", userLogin);
router.get("/me", tokenVerify, getLoggedInUser);
router.post("/logout", userLogout);
router.post("/account-activation-by-otp/:token", accountActivationByOtp);

// export defult
export default router;
