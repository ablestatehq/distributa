import React from "react";
import { Outlet } from "react-router-dom";
import PublicNav from "../publicnav/PublicNav";
import Footer from "../footer/Footer";

function AuthLayout() {
  return (
    <main className="w-screen h-screen bg-grey overflow-x-hidden">
      <section className="container px-3 mx-auto xs:p-0 h-full flex flex-col">
        <PublicNav />
        <Outlet />
        <Footer />
      </section>
    </main>
  );
}

export default AuthLayout;
