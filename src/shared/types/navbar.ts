export interface NavbarSubLink {
  href: string;
  labelKey: string;
}

export interface NavbarLink {
  href: string;
  labelKey: string;
  links?: ReadonlyArray<NavbarSubLink>;
}
