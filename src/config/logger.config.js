/**
 * 
 */

export default {
  console: process.env.NODE_ENV === "development",
  file: process.env.NODE_ENV === "production",
  level: process.env.LOG_LEVEL || "info",
  directory: process.env.LOG_DIR || "logs",
};
