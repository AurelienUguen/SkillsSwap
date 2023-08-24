import { Lesson } from "./lesson";
import { Message } from "./message";
import { Participant } from "./participant";
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
  participants: Participant[];
  messages: Message[];
}

export interface UserAuth {
  email: string | null;
  password: string | null;
}

export interface UserTokkens {
  email: string | null;
  password: string | null;
}

export interface userUpdate {
  roles:string[];
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  district: number;
  city: string;
  description: string;
  tokken: number;
  plaintextPassword: string;
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

export interface UserMessenger {
  id: number;
  city: string;
  district: number;
  description: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  slug: string;
  tokken: number;
  roles:string[];
  sheets: Sheet[];
  participants: Participant[];
  messages: Message[];
}
