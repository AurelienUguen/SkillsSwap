import { Category } from "./category";
import { Lesson } from "./lesson";
import { User } from "./user";

export interface Sheet {
  id: number;
  title: string;
  user: User;
  description: string;
  irl: boolean;
  visio: boolean;
  language: [];
  lesson: Lesson;
  category: Category;
  imageURL: string;
  slug: string;
}

export interface sheetPost {
  category: string;
  title: string;
  user: string;
  description: string;
  irl: boolean;
  visio: boolean;
  language: string[];
}

export interface updateSheet {
  category: string;
  title: string;
  user: string;
  description: string;
  irl: boolean;
  visio: boolean;
  language: string[];
}
