import { Category } from "./category";

export interface Subject {
  id: number;
  slug: string;
  title: string;
  category: Category;
}
