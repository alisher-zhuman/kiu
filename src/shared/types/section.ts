export interface SectionAction {
  downloadFileName?: string;
  href: string;
  label: string;
  openInNewTab?: boolean;
}

export interface Section {
  action?: SectionAction;
  title: string;
  description?: string;
  items?: ReadonlyArray<string>;
  note?: string;
}
