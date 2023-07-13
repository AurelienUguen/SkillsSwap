import { Sheet } from "./sheet";
import { User } from "./user";

export interface Lesson {
  id: number;
  user: User;
  sheet: Sheet;
  bookingDate: Date
}

export interface LessonPost {
  user: string;
  sheet: string;
  bookingDate: string;
}
