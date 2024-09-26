import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../hooks";

function PrivateNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { logout } = useAuth();

  const handleMouseEnter = (link) => {
    setActiveLink(link);
  };

  const handleMouseLeave = () => {
    setActiveLink(location.pathname);
  };

  return (
    <div className="w-screen xs:px-5 sm:px-10 md:px-20 bg-gray-100 flex items-center justify-between">
      <nav className="flex gap-x-2 items-center">
        <NavLink
          to="/dashboard"
          className="text-lg cursor-pointer py-2 text-gray-800 transition-all duration-200"
          onMouseEnter={() => handleMouseEnter("/")}
          onMouseLeave={handleMouseLeave}
        >
          Distributa
        </NavLink>
        <NavLink
          to="/"
          className={`mr-2 text-sm py-2 transition-all duration-200 ${
            activeLink === "/" ? "text-gray-800" : "text-gray-500"
          }`}
          onMouseEnter={() => handleMouseEnter("/")}
          onMouseLeave={handleMouseLeave}
        >
          Share
        </NavLink>
        <NavLink
          to="/invoice"
          className={`mr-2 text-sm py-2 transition-all duration-200 ${
            activeLink === "/invoice" ? "text-gray-800" : "text-gray-500"
          }`}
          onMouseEnter={() => handleMouseEnter("/invoice")}
          onMouseLeave={handleMouseLeave}
        >
          Invoice
        </NavLink>
      </nav>
      <div>
        <button
          className="text-white bg-[#007BFF] hover:bg-[#0B5ED7] text-sm py-2 px-4 rounded-sm cursor-pointer duration-200 ease-in-out"
          onClick={async () => {
            await logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default PrivateNav;
