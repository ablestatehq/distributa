import { authRoutes } from "../features";
import { Home } from "../pages";

import AuthLayout from "../Layouts/components/auth/AuthLayout";
import HomeLayout from "../Layouts/components/home/HomeLayout";

import { publicRoutes as invoicingPublicRoutes } from "../features/invoicing/routes";

export const publicRoutes = [
  {
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    element: <HomeLayout />,
    children: [
      ...invoicingPublicRoutes,
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];
