import { authRoutes } from "../features";
import { sharingRoutes } from "../features";
import { invoicingRoutes } from "../features/invoicing";
import { Home } from "../pages";
import AuthLayout from "../Layouts/components/auth/AuthLayout";
import HomeLayout from "../Layouts/components/home/HomeLayout";

export const publicRoutes = [
  {
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    element: <HomeLayout />,
    children: [
      ...sharingRoutes,
      ...invoicingRoutes,
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];
