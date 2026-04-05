const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL } = process.env;

export const API_URL = NEXT_PUBLIC_API_URL || "/api";
export const SITE_URL = NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
