import express from "express";
import {
  getAllUsers,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { usePhoto } from "../utils/multer.js";

// init router dorm express
const router = express.Router();

// routing
router.route("/").get(getAllUsers).post(usePhoto, createUser);
router
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser)
  .patch(updateUser);

// export defult
export default router;
