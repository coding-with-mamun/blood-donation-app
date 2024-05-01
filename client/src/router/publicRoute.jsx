import Layout from "../components/layout/Layout";
import NotFoundPage from "../components/layout/NotFoundPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/home/Home";
import PublicRard from "./PublicRard";

// create public route
export const publicRoute = [
  {
    element: <PublicRard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },

          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
];
