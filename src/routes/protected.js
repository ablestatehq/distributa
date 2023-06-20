import { Dashboard } from "../pages";
import { Private } from "./components";
import { AppwriteService as Appwrite } from "../services";
const appwrite = new Appwrite();

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Private className="border border-red-500 h-20 w-20"/>,
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
        index: true,
        element: <div className="border border-red-500">Dashboard</div>,
      },
    ],
  },
];
