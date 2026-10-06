export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Impression's Next 15 CSS targets, not the CLI's bundled prefixer defaults.
      overrideBrowserslist: [
        "chrome 64",
        "edge 79",
        "firefox 67",
        "opera 51",
        "safari 12",
      ],
    },
  },
};
