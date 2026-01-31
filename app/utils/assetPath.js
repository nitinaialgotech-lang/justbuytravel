/**
 * Utility function to get the correct path for static assets
 * This ensures basePath is included when needed for static exports
 */
export const getAssetPath = (path) => {
  // Handle null/undefined paths
  if (!path) return '';

  // If path is already a full URL (http/https), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Get basePath from environment variable - must match next.config.mjs basePath
  // Set NEXT_PUBLIC_BASE_PATH when deploying to a subpath (e.g. /justbuytravel_next/demo); leave unset for root
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // If basePath is just '/', return the path as is
  if (basePath === '/' || !basePath) {
    return cleanPath;
  }

  // Combine basePath with the asset path
  return `${basePath}${cleanPath}`;
};

