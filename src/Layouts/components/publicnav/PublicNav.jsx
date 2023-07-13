import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../hooks";

function PublicNav() {
	const location = useLocation();
	const [activeLink, setActiveLink] = useState(location.pathname);

	const handleMouseEnter = (link) => {
		setActiveLink(link);
	};

	const handleMouseLeave = () => {
		setActiveLink(location.pathname);
	};
	return (
		<header className="flex justify-between mt-5">
			<div>
				<NavLink
					to="/"
					className="underline decoration-black text-primary-900 text-lg font-bold py-3">
					Distributa
				</NavLink>
			</div>
			<nav>
				<NavLink
					to="/login"
					className="mr-6 p-3"
					onMouseEnter={() => handleMouseEnter("/")}
					onMouseLeave={handleMouseLeave}>
					Login
				</NavLink>
				<NavLink
					className="text-primary-900 font-semibold bg-gray-200 p-4"
					to="https://github.com/ablestatehq/distributa"
					target="_blank">
					Github
				</NavLink>
			</nav>
		</header>
	);
}

export default PublicNav;
