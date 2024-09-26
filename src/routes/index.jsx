import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { NotFound } from "./components";
import { PublicNav, Footer } from "../Layouts/components";

function NotFoundLayout({ children }) {
  return (
    <main className="flex flex-col min-h-screen container mx-auto lg:max-w-6xl">
      <PublicNav />
      {children}
      <Footer />
    </main>
  );
}

function Routes() {
  const router = createBrowserRouter([
    ...publicRoutes,
    ...protectedRoutes,
    {
      path: "*",
      element: (
        <NotFoundLayout>
          <NotFound />
        </NotFoundLayout>
      ),
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default Routes;
