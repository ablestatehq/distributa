import { Outlet } from "react-router-dom";
import { PublicNav } from "../components";

const Main = () => {
	return (
		<main class="container mx-auto">
			<PublicNav />
			{/* <div className="w-screen"> */}
			<Outlet />
			{/* </div> */}
		</main>
	);
};

export default Main;
