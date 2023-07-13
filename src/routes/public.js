import { authRoutes } from "../features";
import { sharingRoutes } from "../features";
import { invoicingRoutes } from "../features/invoicing";
import Home from "../pages/home";

export const publicRoutes = [
	...authRoutes,
	...sharingRoutes,
	...invoicingRoutes,
	{
		path: "/",
		element: <Home />,
	},
];
