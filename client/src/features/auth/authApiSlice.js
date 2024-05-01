import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/api";

// register patient
export const registerPatient = createAsyncThunk(
  "auth/registerPatient",
  async ({ input, inputReset }) => {
    try {
      const response = await API.post("/api/v1/auth/register", input);

      inputReset();

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ input, inputReset, navigate }) => {
    try {
      const response = await API.post("/api/v1/auth/login", input);
      navigate("/dashboard");
      inputReset();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// login logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async ({ navigate }) => {
    try {
      const response = await API.post("/api/v1/auth/logout");
      navigate("/login");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get login user
export const getLoginUser = createAsyncThunk("auth/getLoginUser", async () => {
  try {
    const response = await API.get("/api/v1/auth/me");

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
