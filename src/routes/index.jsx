import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { NotFound } from "./components";

function Routes() {
  const router = createBrowserRouter([
    ...publicRoutes,
    ...protectedRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default Routes;
