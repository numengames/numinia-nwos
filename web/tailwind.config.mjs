import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				border: "rgb(var(--border) / <alpha-value>)",
				input: "rgb(var(--input) / <alpha-value>)",
				ring: "rgb(var(--ring) / <alpha-value>)",
				background: "rgb(var(--background) / <alpha-value>)",
				foreground: "rgb(var(--foreground) / <alpha-value>)",
				accent: {
					DEFAULT: "rgb(var(--accent) / <alpha-value>)",
					glow: "var(--accent-glow)",
				},
				card: {
					DEFAULT: "rgb(var(--card) / <alpha-value>)",
					hover: "rgb(var(--bg-card-hover) / <alpha-value>)",
					foreground: "rgb(var(--card-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "rgb(var(--muted) / <alpha-value>)",
					foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
				},
				dim: "rgb(var(--text-dim) / <alpha-value>)",
				green: "rgb(var(--green) / <alpha-value>)",
				red: "rgb(var(--red) / <alpha-value>)",
				yellow: "rgb(var(--yellow) / <alpha-value>)",
				blue: "rgb(var(--blue) / <alpha-value>)",
				purple: "rgb(var(--purple) / <alpha-value>)",
				/* Solarpunk mediterráneo */
				terracota: "rgb(var(--terracota) / <alpha-value>)",
				ocre: "rgb(var(--ocre) / <alpha-value>)",
				arena: "rgb(var(--arena) / <alpha-value>)",
				"azul-med": "rgb(var(--azul-med) / <alpha-value>)",
				salvia: "rgb(var(--salvia) / <alpha-value>)",
				/* Steampunk */
				cobre: "rgb(var(--cobre) / <alpha-value>)",
				bronce: "rgb(var(--bronce) / <alpha-value>)",
				/* Cyberpunk contenido */
				teal: "rgb(var(--teal) / <alpha-value>)",
				ambar: "rgb(var(--ambar) / <alpha-value>)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				display: ["var(--font-display)", "system-ui", "sans-serif"],
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			backgroundImage: {
				"accent-glow":
					"radial-gradient(ellipse 60% 40% at 70% -10%, var(--accent-glow), transparent)",
				"veil-glow":
					"radial-gradient(ellipse 80% 60% at 0% 100%, var(--veil-glow), transparent)",
			},
			boxShadow: {
				"accent-sm": "0 0 12px var(--accent-glow)",
				"accent-md": "0 0 24px var(--accent-glow)",
				"cobre-sm": "0 0 12px rgba(184, 115, 51, 0.3)",
				"cobre-md": "0 0 24px rgba(184, 115, 51, 0.4)",
			},
			animation: {
				"slide-up": "slideUp 0.6s ease-out both",
				"slide-up-1": "slideUp 0.7s ease-out 0.1s both",
				"slide-up-2": "slideUp 0.7s ease-out 0.2s both",
				"slide-up-3": "slideUp 0.7s ease-out 0.3s both",
				"slide-up-4": "slideUp 0.7s ease-out 0.4s both",
				"twinkle": "twinkle 3s ease-in-out infinite",
			},
			keyframes: {
				slideUp: {
					from: { opacity: "0", transform: "translateY(24px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				twinkle: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.3" },
				},
			},
		},
	},
	plugins: [tailwindcssAnimate],
};
