import React from "react";
import PublicNav from "../publicnav/PublicNav";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

function HomeLayout() {
  return (
    <main className="w-screen h-screen bg-white overflow-x-hidden">
      <section className="container px-3 lg:max-w-6xl xs:mx-auto xs:p-0 h-full flex flex-col">
        <PublicNav />
        <Outlet />
        <Footer />
      </section>
    </main>
  );
}

export default HomeLayout;
