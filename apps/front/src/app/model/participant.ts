import { Conversation } from "./conversation";
import { User } from "./user";

export interface Participant {
  id: number,
  user: User,
  conversation: Conversation,
  isNewMsg: boolean
}

export interface PostParticipant {
  user: string,
  conversation: string,
}

export interface PostIsNewMsg {
  isNewMsg: boolean
}
