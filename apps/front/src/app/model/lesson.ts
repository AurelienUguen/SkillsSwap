import { Sheet } from "./sheet";
import { User } from "./user";

export interface Lesson {
  id: number;
  user: User;
  sheet: Sheet;
  bookingDate: Date;
  masterValidate: boolean;
  padawanValidate: boolean;
}

export interface LessonPost {
  user: string;
  sheet: string;
  bookingDateEntry: string;
  masterValidate: boolean;
  padawanValidate: boolean;
}
