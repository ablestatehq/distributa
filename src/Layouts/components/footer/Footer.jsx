import React from "react";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className="">
      <section className="md:flex py-14">
        <div className="w-3/4 flex flex-col gap-7">
          <NavLink
            className="text-primary-900 underline decoration-slate-500 font-bold"
            to="/"
          >
            Distributa
          </NavLink>
          <article>
            <p>
              Simplfying the process, making it easy for{" "}
              <br className="hidden sm:block" />
              you to track your expenses and generate{" "}
              <br className="hidden sm:block" />
              professional invoices in minutes
            </p>
          </article>

          <figure className="flex flex-inline gap-5">
            <img src="Facebook.png" alt="facebook icon" />
            <img src="Instagram.png" alt="instagram icon" />
            <img src="Twitter.png" alt="twitter icon" />
            <img src="LinkedIn.png" alt="linkedin icon" />
          </figure>
        </div>
        <br className="py-4 md:hidden" />
        <nav className="md:w-1/4 ms-auto flex flex-col md:items-end gap-2">
          <h4 className="font-bold">Links</h4>
          <NavLink to="#">Sign Up</NavLink>
          <NavLink to="#">Login</NavLink>
          <NavLink to="#">FAQS</NavLink>
          <NavLink to="#">Support</NavLink>
          <NavLink to="myinvoice.html">Invoice</NavLink>
        </nav>
      </section>
      <section className="md:flex justify-between py-6 border-t-2 border-black">
        <article>
          <p>&copy; 2023. All rights reserved.</p>
        </article>
        <nav className="flex gap-x-12 text-right">
          <NavLink to="#">Privacy Policy</NavLink>
          <NavLink to="#">Terms of service</NavLink>
        </nav>
      </section>
    </footer>
  );
}

export default Footer;
