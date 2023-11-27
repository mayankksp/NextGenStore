// Base URL for the local server
const baseUrl = "http://localhost:8080";

// API endpoint derived from the base URL
export const api = `${baseUrl}/api`;

/**
 * Generates a public URL for a given file.
 * 
 * @param {string} fileName - The name of the file for which the URL is to be generated.
 * @returns {string} - The complete public URL for the file.
 */
export const generatePublicUrl = (fileName) => {
  // Construct and return the public URL using the base URL and the file name
  return `${baseUrl}/public/${fileName}`;
};