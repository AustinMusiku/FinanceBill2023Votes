/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
	theme: {
		extend: {
			fontFamily: {
				display: ["Recoleta", "serif"],
				sans: ["Sora", "sans-serif"],
				// serif: ["Bebas Neue", "sans-serif"],
			},
			fontSize: {
				sm: ".825rem",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
