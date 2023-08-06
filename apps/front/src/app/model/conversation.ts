import { Message } from "./message";
import { Participant } from "./participant";

export interface Conversation {
  id: number,
  participants: Participant[],
  messages: Message[],
}
