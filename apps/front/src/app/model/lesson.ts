import { Sheet } from "./sheet";
import { User } from "./user";

export interface Lesson {
  id: number;
  user: User;
  sheet: Sheet;
  bookingDate: Date
}

export interface LessonPost {
  userId: number;
  sheetId: number;
  bookingDate: Date;
}
