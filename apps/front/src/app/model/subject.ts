import { Category } from "./category";

export interface Subject {
  id: string;
  slug: string;
  title: string;
  category: Category;
}
