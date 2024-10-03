import { authRoutes } from "../features";
import { sharingRoutes } from "../features";
import { invoicingRoutes } from "../features/invoicing";
import { Outlet } from "react-router-dom";
import { Footer, PublicNav } from "../Layouts/components";
import { Home } from "../pages";

function AuthLayout() {
  return (
    <main className="w-screen h-screen bg-grey overflow-x-hidden">
      <section className="container px-3 lg:max-w-6xl xs:mx-auto xs:p-0 h-full flex flex-col">
        <PublicNav/>
        <Outlet />
        <Footer />
      </section>
    </main>
  );
}

function HomeLayout() {
  return (
    <main className="w-screen h-screen bg-white overflow-x-hidden">
      <section className="container px-3 lg:max-w-6xl xs:mx-auto xs:p-0 h-full flex flex-col">
        <PublicNav />
        <Outlet />
        <Footer />
      </section>
    </main>
  );
}

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
