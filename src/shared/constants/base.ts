export const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const FACULTY_SECTION_OPTIONS = [
  "THEOLOGY",
  "PHILOLOGY",
  "SHARIAT",
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SERVER_FETCH_TIMEOUT_MS = 6000;
