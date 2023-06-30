import React from "react";
import { NavLink } from "react-router-dom";
function Footer() {
	return (
		<footer>
			<section class="flex py-14">
				<div class="w-3/4 flex flex-col gap-7">
					<NavLink
						class="text-primary-900 underline decoration-slate-500 font-bold"
						to="/">
						Distributa
					</NavLink>
					<article>
						<p>
							Simplfying the process,making it easy for <br />
							you to track your expenses and generate <br />
							professional invoices in minutes
						</p>
					</article>

					<figure class="flex flex-inline gap-5">
						<img src="Facebook.png" />
						<img src="Instagram.png" />
						<img src="Twitter.png" />
						<img src="LinkedIn.png" />
					</figure>
				</div>
				<nav class="w-1/4 ms-auto flex flex-col items-end gap-2">
					<h4 class="font-bold">Links</h4>
					<NavLink to="#">Sign Up</NavLink>
					<NavLink to="#">Login</NavLink>
					<NavLink to="#">FAQS</NavLink>
					<NavLink to="#">Support</NavLink>
					<NavLink to="myinvoice.html">Invoice</NavLink>
				</nav>
			</section>
			<section class="flex justify-between pt-6 border-t-2 border-black">
				<article>
					<p>&copy; 2023. All rights reserved.</p>
				</article>
				<nav class="flex gap-12 text-right">
					<NavLink to="#">Privacy Policy</NavLink>
					<NavLink to="#">Terms of service</NavLink>
				</nav>
			</section>
		</footer>
	);
}

export default Footer;
