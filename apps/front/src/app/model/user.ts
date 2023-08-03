import { Lesson } from "./lesson";
import { Sheet } from "./sheet";

export interface User {
  id: number;
  city: string;
  district: number;
  description: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  plaintextPassword: string;
  phone: string;
  slug: string;
  tokken: number;
  lessons: Lesson[];
  roles:string[];
  sheets: Sheet[];
}

export interface userUpdate {
  roles:string[];
  firstname: string;
  lastname: string;
  email: string;
  plaintextPassword: string;
  phone: string;
  district: number;
  city: string;
  description: string;
}

export interface UserAuth {
  email: string | null;
  password: string | null;
}

export interface userConnected {
  slug: string;
  firstname: string;
}

export interface UserPost {
  roles:string[];
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  plaintextPassword: string;
  district: number;
  city: string;
  description: string;
}
