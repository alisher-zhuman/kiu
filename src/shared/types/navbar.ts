export interface NavbarSubItem {
  href: string;
  label: string;
}

export interface NavbarItem {
  href: string;
  label: string;
  items?: ReadonlyArray<NavbarSubItem>;
}
