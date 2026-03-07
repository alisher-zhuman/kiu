export interface NavbarSubLink {
  href: string;
  label: string;
}

export interface NavbarLink {
  href: string;
  label: string;
  links?: ReadonlyArray<NavbarSubLink>;
}
