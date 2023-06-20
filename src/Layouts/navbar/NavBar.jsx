import { PublicNav } from "../components";
import { PrivateNav } from "../components";

function NavBar({ user }) {
  return user ? <PrivateNav /> : <PublicNav />;
}

export default NavBar;
