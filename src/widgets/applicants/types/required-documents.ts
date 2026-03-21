export interface RequiredDocumentsContact {
  href: string;
  label: string;
}

export interface RequiredDocumentsSection {
  contacts?: ReadonlyArray<RequiredDocumentsContact>;
  contactsLabel?: string;
  items: ReadonlyArray<string>;
  title?: string;
}
