import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import cn from "../../../utils/cn";
import Button from "../../../components/forms/Button";

function PublicNav() {
  const location = useLocation();
  const [, setActiveLink] = useState(location.pathname);

  const handleMouseEnter = (link) => {
    setActiveLink(link);
  };

  const handleMouseLeave = () => {
    setActiveLink(location.pathname);
  };

  const styles = {
    font: "font-satoshi font-normal text-small leading-100 tracking-tightest",
  };

  return (
    <header className="w-full flex justify-between mt-5 h-fit">
      <div className="h-full flex items-center">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <nav className="hidden md:flex">
        <NavLink
          to="/expense"
          className={cn("mr-6 p-3", styles.font)}
          onMouseEnter={() => handleMouseEnter("/")}
          onMouseLeave={handleMouseLeave}
        >
          Expenses
        </NavLink>
        <NavLink
          to="/invoice"
          className={cn("mr-6 p-3", styles.font)}
          onMouseEnter={() => handleMouseEnter("/")}
          onMouseLeave={handleMouseLeave}
        >
          Invoice
        </NavLink>
        <NavLink
          to="/login"
          className={cn("mr-6 p-3", styles.font)}
          onMouseEnter={() => handleMouseEnter("/")}
          onMouseLeave={handleMouseLeave}
        >
          Login
        </NavLink>
        <Button
          type="button"
          kind="plain"
          className="text-[1rem] px-5 font-bold"
          onClick={() =>
            window.open(
              "https://github.com/ablestatehq/distributa",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          Github
        </Button>
      </nav>
    </header>
  );
}

export default PublicNav;
