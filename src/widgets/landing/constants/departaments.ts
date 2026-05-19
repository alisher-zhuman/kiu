import { type DepartmentLink } from "../types";

export const DEPARTMENT_LINKS: ReadonlyArray<DepartmentLink> = [
  {
    href: "/faculty/theology",
    labelKey: "items.theology",
  },
  {
    href: "/faculty/philology",
    labelKey: "items.philology",
  },
  {
    href: "/faculty/sharia",
    labelKey: "items.sharia",
  },
] as const;
