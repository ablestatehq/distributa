/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./public/**/*.html", "./src/**/*.{html,js,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					900: "#0d6efd",
					800: "rgba(13,110,253,0.8)",
					700: "rgba(13,110,253,0.7)",
					600: "rgba(13,110,253,0.6)",
					500: "rgba(13,110,253,0.5)",
					400: "rgba(13,110,253,0.4)",
					300: "rgba(13,110,253,0.3)",
					200: "rgba(13,110,253,0.2)",
					100: "rgba(13,110,253,0.1)",
					50: "rgba(13,110,253,0.05)",
				},
				main: "#111111",
				grey1: "#FAFAFA",
				greyborder: "#BBBBBB",
				warning: "#F3BB1B",
				error: "#F13637",
				success: "#3DC13C",
			},
		},
		screens: {
			xs: "375px",
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
