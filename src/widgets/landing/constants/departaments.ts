import { type DepartmentLink } from "../types";

export const DEPARTMENT_LINKS: ReadonlyArray<DepartmentLink> = [
  {
    href: "/departments/theology",
    labelKey: "items.theology",
  },
  {
    href: "/departments/philology",
    labelKey: "items.philology",
  },
  {
    href: "/departments/sharia",
    labelKey: "items.sharia",
  },
] as const;
