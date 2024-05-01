import Layout from "../components/layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivareGard from "./PrivareGard";

// create privateRoute  route
export const privateRoute = [
  {
    element: <PrivareGard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];
