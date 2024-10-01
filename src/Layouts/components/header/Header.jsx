import Logo from "../../../components/common/Logos/Logo";
import { Menu, CircleX } from "../../../components/common/icons";

const Header = ({ handleToggleMenu, toggleMenu }) => {
  return (
    <header className="flex md:hidden w-full px-5  py-4 justify-between">
      <Logo
        className="w-[5.758rem] h-[1.125rem] md:w-32 md:h-6"
        variant="blue"
      />
      <button className="md:hidden" onClick={handleToggleMenu}>
        {toggleMenu ? (
          <CircleX variation="black" />
        ) : (
          <Menu variation="black" />
        )}
      </button>
    </header>
  );
};

export default Header;
