import { Conversation } from "./conversation";
import { User } from "./user";


export interface Message {
  id: number;
  title: string;
  content: string;
  owner: User;
  isRead: boolean;
  createdAt: Date;
  conversation: Conversation;
}

export interface MessageToDisplay {
  id: number;
  title: string;
  content: string;
  owner: User;
  isRead: boolean;
  createdAt: Date;
}

export interface MsgPost {
  title: string;
  content: string;
  owner: string;
  conversation: string;
  isRead: boolean;
  createdAt: Date;
}

