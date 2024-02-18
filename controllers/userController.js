import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { fileDeleteToCloud, fileUploadToCloud } from "../utils/cloudinary.js";
import { findPublicId, isEmail, isMobile } from "../helpers/helpers.js";

/**
 * @description Get all users data
 * @method GET
 * @router /api/v1/user
 * @access public
 * @param {*} req
 * @param {*} res
 */

export const getAllUsers = asyncHandler(async (req, res) => {
  // get all user
  const users = await User.find();

  // check user data
  if (users.length === 0) {
    return res.status(404).json({ message: "User data not found" });
  }

  res.status(200).json(users);
});

/**
 * @description Get single users data
 * @method GET
 * @router /api/v1/user/:id
 * @access public
 * @param {*} req
 * @param {*} res
 */

export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // get single  user
  const user = await User.findById(id);

  // check user data
  if (!user) {
    return res.status(404).json({ message: "User data not found" });
  }

  res.status(200).json(user);
});

/**
 * @description create new user
 * @method POST
 * @router /api/v1/user/
 * @access public
 * @param {*} req
 * @param {*} res
 */
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "Bad request" });
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  // check file
  let fileDta = null;
  if (req.file) {
    const data = await fileUploadToCloud(req.file.path);
    fileDta = data.secure_url;
  }

  // check valid email and phone
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  } else if (isMobile(phone)) {
    return res.status(400).json({ message: "Invalid Mobile Number" });
  }

  // check email and phone number
  const checkEmail = await User.findOne({ email });
  const checkPhone = await User.findOne({ phone });
  if (checkEmail) {
    return res.status(400).json({ message: "Email already exist" });
  } else if (checkPhone) {
    return res.status(400).json({ message: "Number already exist" });
  }

  // create new user
  const user = await User.create({
    name,
    email,
    phone,
    photo: fileDta,
    password: hashPass,
  });

  // response
  res.status(201).json({ user, message: "User create" });
});

/**
 * @description delete user
 * @method DELETE
 * @router /api/v1/user/:id
 * @access public
 * @param {*} req
 * @param {*} res
 */
export const deleteUser = asyncHandler(async (req, res) => {
  // get delete user id
  const { id } = req.params;

  // delete data form db
  const user = await User.findByIdAndDelete(id);

  // delete cloud file
  await fileDeleteToCloud(findPublicId(user.photo));

  // response
  res.status(200).json({ user, message: "User data deleted succefull" });

  //
});

/**
 * @description update user
 * @method PUT?PATCH
 * @router /api/v1/user/:id
 * @access public
 * @param {*} req
 * @param {*} res
 */
export const updateUser = asyncHandler(async (req, res) => {
  // get update user id
  const { id } = req.params;

  // get updated data
  const { name, email, phone } = req.body;

  // check valid email and phone
  if (email) {
    if (!isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
  }

  if (phone) {
    if (isMobile(phone)) {
      return res.status(400).json({ message: "Invalid Mobile Number" });
    }
  }

  // update data
  const user = await User.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  // response
  res.status(200).json({ user, message: "User data Update succefull" });
});
