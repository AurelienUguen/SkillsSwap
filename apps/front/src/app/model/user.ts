import { Lesson } from "./lesson";
import { Sheet } from "./sheet";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  district: number;
  city: string;
  sheets: Sheet
  lessons: Lesson;
  roles: [];
  description: string;
  slug: string;
}

export interface UserPost {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
