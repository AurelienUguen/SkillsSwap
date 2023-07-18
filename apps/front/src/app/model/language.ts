import { Sheet } from "./sheet";

export interface Language {
  id: number;
  name: string;
  sheets: Sheet;
  slug: string;
}
