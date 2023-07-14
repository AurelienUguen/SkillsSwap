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
  roles:string[];
  description: string;
  slug: string;
}

export interface UserPost {
  roles:string[];
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  district: number;
  city: string;
}
