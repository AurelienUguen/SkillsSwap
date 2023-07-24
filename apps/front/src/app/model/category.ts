import { Sheet } from "./sheet";

export interface Category {
  id: number;
  name: string;
  parent: Category;
  categories: Category;
  slug: string;
  sheets: Sheet;
  isParent: boolean;
}
