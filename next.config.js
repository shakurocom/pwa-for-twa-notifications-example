/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

module.exports = withPWA({
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  pwa: {
    disable: process.env.NODE_ENV !== "production" ? true : false,
    dest: "public",
  },
});
