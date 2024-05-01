import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { fileDeleteToCloud, fileUploadToCloud } from "../utils/cloudinary.js";
import {
  createOTP,
  findPublicId,
  isEmail,
  isMobile,
  tokenDecode,
} from "../helpers/helpers.js";
import { sendSMS } from "../utils/sendSMS.js";
import { AccountActivationEmail } from "../mails/AccountActivationEmail.js";
import jwt from "jsonwebtoken";

/**
 * @description create new user
 * @method POST
 * @router /api/v1/auth/register
 * @access public
 * @param {*} req
 * @param {*} res
 */
export const registerAuth = asyncHandler(async (req, res) => {
  const { name, auth, password, role } = req.body;

  // validation
  if (!name || !auth || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // create otp
  const otp = createOTP();

  // check use email or phone
  let authEmail = null;
  let authPhone = null;

  if (isEmail(auth)) {
    authEmail = auth;

    // check email
    const checkEmail = await User.findOne({ email: auth });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    // send otp to email
    await AccountActivationEmail(auth, { code: otp, link: "" });
  } else if (isMobile(auth)) {
    authPhone = auth;

    // check phone
    const checkPhone = await User.findOne({ phone: auth });
    if (checkPhone) {
      return res.status(400).json({ message: "Number already exist" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "You must use a Mobile number or Email address" });
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name,
    email: authEmail,
    phone: authPhone,
    role,
    password: hashPass,
    accessToken: otp,
  });

  if (authEmail) {
    // send otp to email
    await AccountActivationEmail(auth, { code: otp, link: "" });
  } else if (authPhone) {
    // send opt
    await sendSMS(
      auth,
      `Hello ${name}, you're account activation OPT is ${otp}`
    );
  }

  // send token to cookie
  const activationToken = jwt.sign(
    { auth },
    process.env.ACCOUNT_ACTIVATION_SECRET,
    {
      expiresIn: "15min",
    }
  );
  res.cookie("activationToken", activationToken);

  // response
  res.status(201).json({ user, message: "User create" });
});

/**
 * @description User account accvation
 * @method POST
 * @router /api/v1/auth/account-activation-by-otp
 * @access public
 * @param {*} req
 * @param {*} res
 */
export const accountActivationByOtp = asyncHandler(async (req, res) => {
  // get token
  const { token } = req.params;
  const { otp } = req.body;

  // token decode
  const actavtionToken = tokenDecode(token);

  // verify token
  const verifyToken = jwt.verify(
    actavtionToken,
    process.env.ACCOUNT_ACTIVATION_SECRET
  );
  if (!verifyToken) {
    res.status(400).json({ message: "Invalid Token" });
  }

  // activate user

  let activateUser = null;

  if (isEmail(verifyToken.auth)) {
    activateUser = await User.findOne({ email: verifyToken.auth });

    // check activate user
    if (!activateUser) {
      return res.status(404).json({ message: "Email not found" });
    }
  } else if (isMobile(verifyToken.auth)) {
    activateUser = await User.findOne({ phone: verifyToken.auth });

    // check activate user
    if (!activateUser) {
      return res.status(404).json({ message: "Phone number not found" });
    }
  } else {
    return res.status(400).json({ message: "Invalid User" });
  }

  // check otp
  if (otp !== activateUser.accessToken) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Update activate user data
  activateUser.accessToken = null;
  activateUser.isActivate = true;
  activateUser.save();

  // cleat cookie
  res.clearCookie("activationToken");

  // response
  res
    .status(200)
    .json({ user: activateUser, message: "User activation successful" });
});

/**
 * @description User login
 * @method post
 * @router /api/v1/auth/login
 * @access public
 * @param {*} req
 * @param {*} res
 */
export const userLogin = asyncHandler(async (req, res) => {
  // get data
  const { auth, password } = req.body;

  // validation
  if (!auth || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check user auth
  let loginUser = null;
  if (isEmail(auth)) {
    // find login user
    loginUser = await User.findOne({ email: auth });

    // check user exists or not
    if (!loginUser) {
      return res.status(404).json({ message: "Email not found" });
    }
  } else if (isMobile(auth)) {
    // find login user
    loginUser = await User.findOne({ phone: auth });

    // check user exists or not
    if (!loginUser) {
      return res.status(404).json({ message: "Phone not found" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "User must have valid phone or email" });
  }

  // check password
  const passwordCheck = bcrypt.compareSync(password, loginUser.password);

  if (!passwordCheck) {
    return res.status(400).json({ message: "Wrong password" });
  }

  // create login user token
  const accessToken = jwt.sign({ auth }, process.env.USE_LOGIN_SECRET, {
    expiresIn: "365d",
  });

  // set token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  // response
  res.status(200).json({
    accessToken,
    user: loginUser,
    message: "User Login successful",
  });
});

/**
 * @description User profile
 * @method post
 * @router /api/v1/auth/user-profile
 * @access private
 * @param {*} req
 * @param {*} res
 */

export const getLoggedInUser = asyncHandler(async (req, res) => {
  if (!req.me) {
    return res.status(404).json({ message: "Logged in user not found" });
  }

  // response
  return res.status(200).json({ auth: req.me, message: "" });
});

/**
 * @description User logout
 * @method post
 * @router /api/v1/auth/logout
 * @access private
 * @param {*} req
 * @param {*} res
 */

export const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout Successful" });
});
