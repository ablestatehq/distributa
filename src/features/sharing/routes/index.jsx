import { Distribute } from "../components";

export const sharingRoutes = [
	{
		path: "/expense",
		element: <Distribute />,
	},
	{
		path: "expense/:id",
		element: <Distribute />,
	},
];
