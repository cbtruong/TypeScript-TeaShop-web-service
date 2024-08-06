/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				white: "white",
				black: "black",
				lightBlack: "#242A35",
			},
			height: {
				header: "8.3125rem",
			},
			fontFamily: {
				roboto: `"Poppins", sans-serif`,
			},
			margin: {
				big: "3.5rem",
				h1: "2.5rem",
				h2: "1.5rem",
				h3: "1.25rem",
				normal: "1rem",
				small: "0.875rem",
				smaller: "0.75rem",
				tiny: "0.625rem,",
			},
			fontSize: {
				big: "3.5rem",
				h1: "2.5rem",
				h2: "1.5rem",
				h3: "1.25rem",
				normal: "1rem",
				small: "0.875rem",
				smaller: "0.75rem",
				tiny: "0.625rem",
			},
			fontWeight: {
        normal:"400",
        meidum:"600",
        semiBold:"700",
      },
		},
	},
	plugins: [],
};
