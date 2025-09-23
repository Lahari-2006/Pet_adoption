// config.js
const config = {
  // Use environment variable if available (for Docker), otherwise use localhost
  url: import.meta.env.VITE_API_URL || "http://localhost:2017"
};

export default config;
