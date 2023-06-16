import { Dashboard } from "../pages";
import { Private } from "./components";

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Private />,
    children: [{ index: true, element: <Dashboard /> }],
  },
];
