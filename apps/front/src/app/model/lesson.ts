import { Course } from "./course";

export interface Lesson {
  id: number;
  user:string;
  date: Date;
  irl: boolean;
  visio: boolean;
  course: Course;
}
