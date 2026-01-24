export const API_URL = (() => {
  const url = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_SERVER_BASE_URL is missing");
  }
  return url;
})();
