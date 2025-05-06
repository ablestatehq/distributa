/**
 * Utility functions for setting up PDF.js worker
 */

/**
 * Checks if a URL is valid for PDF viewing
 * @param {string} url - The URL to check
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidPdfUrl = (url) => {
  if (!url || typeof url !== "string") {
    return false;
  }

  // For blob URLs
  if (url.startsWith("blob:")) {
    return true;
  }

  // For http/https URLs
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return true;
  }

  // For data URLs
  if (url.startsWith("data:application/pdf")) {
    return true;
  }

  return false;
};

/**
 * Loads the PDF.js worker script
 * @returns {Promise<string>} - A promise that resolves to the worker URL
 */
export const loadPdfWorker = async () => {
  // First try local worker
  const localWorkerPath = "/pdf.worker.min.js";

  try {
    const response = await fetch(localWorkerPath, { method: "HEAD" });
    if (response.ok) {
      return localWorkerPath;
    }
  } catch (error) {
    console.warn("Local PDF worker not found, falling back to CDN");
  }

  // Fallback to CDN
  return "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";
};

/**
 * Creates a safe PDF blob URL
 * @param {Blob} blob - The PDF blob
 * @returns {string|null} - The blob URL or null if invalid
 */
export const createSafePdfBlobUrl = (blob) => {
  if (!blob || !(blob instanceof Blob)) {
    return null;
  }

  try {
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Failed to create blob URL:", error);
    return null;
  }
};
