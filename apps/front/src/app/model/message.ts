import { Conversation } from "./conversation";
import { User } from "./user";


export interface Message {
  id: number;
  title: string;
  content: string;
  owner: User;
  is_read: boolean;
  created_at: Date;
  conversation: Conversation;
}

export interface MessageToDisplay {
  id: number;
  title: string;
  content: string;
  owner: User;
  is_read: boolean;
  created_at: Date;
}

export interface MsgPost {
  title: string;
  content: string;
  owner: string;
  conversation: string;
  is_read: boolean;
  created_at: Date;
}

