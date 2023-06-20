import { Dashboard } from "../pages";
import { Private } from "./components";
import { AppwriteService as Appwrite } from "../services";
const appwrite = new Appwrite();

export const protectedRoutes = [
  {
    element: <Private className="border border-red-500 h-20 w-20" />,
    loader: async () => {
      try {
        const user = await appwrite.getAccount();
        return user;
      } catch (error) {
        return null;
      }
    },
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];
