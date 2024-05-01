import { createSlice } from "@reduxjs/toolkit";
import {
  getLoginUser,
  loginUser,
  logoutUser,
  registerPatient,
} from "./authApiSlice";

// create auth slice

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    auth: localStorage.getItem("donarUserLogin")
      ? JSON.parse(localStorage.getItem("donarUserLogin"))
      : null,
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEnpty: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // user register
    builder
      .addCase(registerPatient.pending, (state) => {
        state.loader = true;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.auth = action.payload.user;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      //user login
      .addCase(loginUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.auth = action.payload.user;
        localStorage.setItem(
          "donarUserLogin",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      //user logout
      .addCase(logoutUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.auth = null;
        localStorage.removeItem("donarUserLogin");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      //Get login user data
      .addCase(getLoginUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.auth = action.payload.auth;
        localStorage.setItem(
          "donarUserLogin",
          JSON.stringify(action.payload.auth)
        );
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
        state.auth = null;
        localStorage.removeItem("donarUserLogin");
      });
  },
});

// selector
export const authSelect = (state) => state.auth;

// action
export const { setMessageEnpty } = authSlice.actions;

// reducer
export default authSlice.reducer;
