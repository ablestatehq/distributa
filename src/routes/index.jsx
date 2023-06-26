import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { Main } from "../Layouts";
import { NotFound } from "./components";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: publicRoutes,
    },
    ...protectedRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default Routes;
