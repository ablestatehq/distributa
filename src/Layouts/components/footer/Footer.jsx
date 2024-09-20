import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
} from "../../../components/icons";

function Footer() {
  return (
    <footer>
      <section className="flex flex-col justify-between gap-y-16 md:flex-row py-16">
        <div className="w-[19.75rem] flex flex-col gap-y-8">
          <NavLink to="/">
            <Logo className="w-[5.875rem] h-[1.10125rem] md:w-[5.85375rem] md:h-[0.96125rem]" />
          </NavLink>
          <article>
            <p className="font-satoshi font-normal leading-150 tracking-tightest">
              Simplfying the process, making it easy for you to track your
              expenses and generate professional invoices in minutes
            </p>
          </article>

          <nav className="flex flex-inline gap-6">
            <Link to="#">
              <Facebook />
            </Link>
            <Link to="#">
              <Instagram />
            </Link>
            <Link to="#">
              <Twitter />
            </Link>
            <Link to="#">
              <LinkedIn />
            </Link>
          </nav>
        </div>
        <nav className="w-fit flex flex-col md:items-start gap-y-3">
          <h4 className="font-bold font-satoshi text-small leading-100 tracking-tightest">
            Links
          </h4>
          <NavLink
            to="/signup"
            className="font-satoshi text-small font-normal leading-100 tracking-tightest"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className="font-satoshi text-small font-normal leading-100 tracking-tightest"
          >
            Login
          </NavLink>
          <NavLink
            to="#"
            className="font-satoshi text-small font-normal leading-100 tracking-tightest"
          >
            FAQS
          </NavLink>
          <NavLink
            to="#"
            className="font-satoshi text-small font-normal leading-100 tracking-tightest"
          >
            Support
          </NavLink>
          <NavLink
            to="/invoice"
            className="font-satoshi text-small font-normal leading-100 tracking-tightest"
          >
            Invoice
          </NavLink>
        </nav>
      </section>
      <section className="flex flex-col gap-y-4 md:flex-row justify-between items-center py-6 border-t-2 border-black font-satishi font-normal text-small">
        <article>
          <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
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
