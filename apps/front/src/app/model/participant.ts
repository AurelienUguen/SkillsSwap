import { Conversation } from "./conversation";
import { User } from "./user";

export interface Participant {
  id: number,
  user: User,
  conversation: Conversation,
}
