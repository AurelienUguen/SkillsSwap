import { Category } from "./category";
import { Language } from "./language";
import { Lesson } from "./lesson";
import { User } from "./user";

export interface Sheet {
  id: number;
  title: string;
  user: User;
  description: string;
  irl: boolean;
  visio: boolean;
  language: Language;
  lesson: Lesson;
  category: Category;
  slug: string;
}

export interface sheetPost {
  category: string;
  title: string;
  user: string;
  description: string;
  irl: boolean;
  visio: boolean;
  language: string;
}
