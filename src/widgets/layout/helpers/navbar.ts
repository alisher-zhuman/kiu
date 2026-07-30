import { type NavbarLink } from "@/shared/types";

export const moveScienceToEnd = (links: ReadonlyArray<NavbarLink>): ReadonlyArray<NavbarLink> => {
  return [
    ...links.filter(({ href }) => href !== "/science"),
    ...links.filter(({ href }) => href === "/science"),
  ];
};
