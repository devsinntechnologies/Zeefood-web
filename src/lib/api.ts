export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://drm.devsinntechnologies.com"
).replace(/\/$/, "");

export const BUSINESS_ID =
  process.env.NEXT_PUBLIC_BUSINESS_ID ||
  "5707b450-9723-4794-9ba4-ee03890cf504";
