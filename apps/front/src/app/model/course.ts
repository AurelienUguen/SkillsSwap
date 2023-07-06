import { Subject } from "./subject";

export interface Course {
  id: number;
  user: string;
  title: string;
  description:string;
  irl: boolean;
  visio: boolean;
  slug: string;
  subject: Subject;
  languages: string;
}
