import { Dashboard } from "../pages";
import { Private } from "./components";

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Private />,
    indexRoute: true,
    children: [{ path: "/dashboard", element: <Dashboard /> }]
  },
];
