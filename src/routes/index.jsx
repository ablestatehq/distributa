import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { Main } from "../Layouts";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: publicRoutes,
    },
    ...protectedRoutes,
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default Routes;
