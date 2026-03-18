import { type NavbarLink } from "@/shared/types";

export const moveResearchToEnd = (
  links: ReadonlyArray<NavbarLink>,
): ReadonlyArray<NavbarLink> => {
  return [
    ...links.filter(({ href }) => href !== "/research"),
    ...links.filter(({ href }) => href === "/research"),
  ];
};
