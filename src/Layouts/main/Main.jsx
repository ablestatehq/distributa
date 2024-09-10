import { Outlet } from "react-router-dom";
import { PublicNav } from "../components";
import { Footer } from "../components";

const Main = () => {
  return (
    <main className="container mx-auto">
      <PublicNav />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Main;
