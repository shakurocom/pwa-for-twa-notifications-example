/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

require("dotenv").config();

const { APP_URL, FCM_API_KEY } = process.env;

module.exports = withPWA({
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  env: {
    APP_URL,
    FCM_API_KEY
  },
  pwa: {
    disable: process.env.NODE_ENV !== "production" ? true : false,
    dest: "public",
  },

  webpack(config, options) {
    const { dev, isServer } = options;

    return config;
  },
});
