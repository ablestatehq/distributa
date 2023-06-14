import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";
import { Main } from "../Layouts";
import { NotFound } from "./components";

function Routes() {
  const children = [
    ...publicRoutes,
    ...protectedRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  const routes = [
    {
      path: "/",
      element: <Main />,
      children,
    },
  ];
  return useRoutes(routes);
}

export default Routes;
