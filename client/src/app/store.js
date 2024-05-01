import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// create store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
  middleware: (getDefultMiddleware) => getDefultMiddleware(),
});

// export
export default store;
