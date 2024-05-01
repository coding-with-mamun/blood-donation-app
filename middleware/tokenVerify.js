import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { isEmail, isMobile } from "../helpers/helpers.js";
import User from "../models/User.js";

// create token verify middleware
const tokenVerify = (req, res, next) => {
  // get server token
  const accessToken = req.cookies.accessToken;

  // check token
  if (!accessToken) {
    return res.status(400).json({ message: "Unauthorised" });
  }

  // verify token
  jwt.verify(
    accessToken,
    process.env.USE_LOGIN_SECRET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: "Invalid token" });
      }

      // get login user data
      let me = null;
      if (isEmail(decode.auth)) {
        // get login user data
        me = await User.findOne({ email: decode.auth }).select("-password");
      } else if (isMobile(decode.auth)) {
        // get login user data
        me = await User.findOne({ phone: decode.auth }).select("-password");
      } else {
        return res.status(400).json({ message: "Invalid auth data" });
      }

      req.me = me;

      next();
    })
  );
};

// export
export default tokenVerify;
