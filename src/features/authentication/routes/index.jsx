import { Login, SignUp } from "../components";
import { AppwriteService as Appwrite } from "../../../services";
import { redirect } from "react-router-dom";
const appwrite = new Appwrite();

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      try {
        const user = await appwrite.getAccount();
        return user;
      } catch (error) {
        return null;
      }
    },
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];
