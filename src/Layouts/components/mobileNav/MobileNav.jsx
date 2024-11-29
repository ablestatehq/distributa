import { useNavigate } from "react-router-dom";
import NavigationLink from "../NavigationLink";
import { useAuth } from "../../../hooks";
import { FileText, PlusSquare, Book } from "../../../components/common/icons";
import cn from "../../../utils/cn";

const MobileNav = ({ toggleMenu, handleMenuToggle }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className={`top-0 right-0 absolute h-full w-full bg-black bg-opacity-45 flex justify-end ${cn(
        {
          hidden: !toggleMenu,
        }
      )}`}
    >
      <aside
        className={`h-full w-fit md:hidden flex-col justify-between bg-white items-end py-16 px-8 z-20 ${cn(
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
              navigate("/settings/profile");
            }}
          >
            Settings
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileNav;
