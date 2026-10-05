const tailwindAnimate = require("tailwindcss-animate");

const neutralScale = [
  "10",
  "15",
  "20",
  "30",
  "50",
  "100",
  "150",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "850",
  "900",
  "950",
];
const monoScale = [
  "50",
  "100",
  "150",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "850",
  "900",
  "910",
  "920",
  "930",
  "940",
  "950",
  "955",
  "960",
  "970",
];

const variableScale = (name, values) =>
  Object.fromEntries(
    values.map((value) => [
      value,
      `color-mix(in srgb, var(--${name}-${value}) calc(<alpha-value> * 100%), transparent)`,
    ]),
  );

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ":is(.dark, [data-theme='dark'])"],
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: { preflight: false },
  theme: {
    fontSize: {
      xs: ".8rem",
      tiny: ".775rem",
      sm: ".94rem",
      desc: "1rem",
      base: "1rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    extend: {
      width: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
      },
      colors: {
        neutral: variableScale("neutral", neutralScale),
        mono: variableScale("mono", monoScale),
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        "nav-foreground": "hsl(var(--nav-foreground) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        sidebar: "hsl(var(--sidebar) / <alpha-value>)",
        "sidebar-hover": "hsl(var(--sidebar-hover) / <alpha-value>)",
        panel: "hsl(var(--panel) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "surface-raised": "hsl(var(--surface-raised) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        "border-strong": "hsl(var(--border-strong) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        focus: "hsl(var(--focus) / <alpha-value>)",
        selected: "hsl(var(--selected) / <alpha-value>)",
        link: "hsl(var(--link) / <alpha-value>)",
        success: "hsl(var(--success) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",
        danger: "hsl(var(--danger) / <alpha-value>)",
        disabled: "hsl(var(--disabled) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        brandPrimary:
          "color-mix(in srgb, var(--colors-brandPrimary) calc(<alpha-value> * 100%), transparent)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans, var(--font-sans))"],
        mono: ["var(--font-inter, var(--font-mono))"],
        tiempos: ["var(--font-tiempos)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        smd: "calc(var(--radius) - 3px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
      },
      boxShadow: {
        input:
          "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
        aceternity:
          "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
      },
    },
  },
  plugins: [tailwindAnimate],
};
