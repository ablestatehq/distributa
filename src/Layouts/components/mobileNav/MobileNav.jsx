import { useNavigate } from "react-router-dom";
import NavigationLink from "../NavigationLink";
import { useAuth } from "../../../hooks";
import { FileText, PlusSquare, Book } from "../../../components/common/icons";
import cn from "../../../utils/cn";

const MobileNav = ({ toggleMenu, handleMenuToggle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className={`top-0 right-0 absolute h-full md:hidden flex-col justify-between items-end py-16 px-8 ${cn(
        {
          flex: toggleMenu,
          hidden: !toggleMenu,
        }
      )}`}
    >
      <nav className="flex flex-col gap-y-4">
        <NavigationLink
          to="/invoices"
          Icon={FileText}
          children="My invoices"
          exact={true}
          onClick={handleMenuToggle}
        />
        <NavigationLink
          to="/invoices/new"
          Icon={PlusSquare}
          children="New Invoice"
          exact={true}
          onClick={handleMenuToggle}
        />
        <NavigationLink
          to="/transactions"
          Icon={Book}
          children="My Transactions"
          exact={true}
          onClick={handleMenuToggle}
        />
      </nav>

      <div className="flex flex-col gap-y-4">
        <button
          className="text-black w-fit px-8"
          onClick={async () => {
            await logout();
            handleMenuToggle();
            navigate("/");
          }}
        >
          Logout
        </button>
        <button
          className="text-black w-fit px-8"
          onClick={() => {
            handleMenuToggle();
            navigate("/settings");
          }}
        >
          Settings
        </button>
      </div>
    </aside>
  );
};

export default MobileNav;
