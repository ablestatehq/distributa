import {
  useRoutes,
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { Main } from "../Layouts";
import { NotFound } from "./components";
import { useAuth } from "../hooks";

function Routes() {
  const { appwrite } = useAuth();
  const children = [
    ...publicRoutes,
    ...protectedRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  const router = createBrowserRouter([
    {
      path: "/",
      loader: async () => {
        try {
          const user = await appwrite.getAccount();
          return user;
        } catch (error) {
          return null;
        }
      },
      element: <Main />,
      children,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default Routes;
