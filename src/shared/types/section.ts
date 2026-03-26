
import { type LinkAction } from "./link-action";

export interface Section {
  action?: LinkAction;
  title: string;
  description?: string;
  items?: ReadonlyArray<string>;
  note?: string;
}
