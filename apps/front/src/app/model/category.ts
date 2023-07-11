import { Sheet } from "./sheet";

export interface Category {
  id: number;
  name: string;
  parent: Category;
  Categories: Category;
  slug: string;
  sheet:Sheet
  isParent: boolean;
}
