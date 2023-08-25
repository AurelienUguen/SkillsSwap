import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, MsgPost } from 'src/app/model/message';
import { ConvMaxId, Conversation, PostConversation } from 'src/app/model/conversation';
import { LinksService } from '../api/links.service';
import { Participant, PostParticipant } from 'src/app/model/participant';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private linksService: LinksService
    ) { }

  getMessages(){
    return this.http.get<Message>(this.linksService.messageUrl);
  }

  getConversations(){
    return this.http.get<Conversation>(this.linksService.conversationUrl);
  }

  getMessagesByUser(slug: string): Observable<Message>{
    const url = `${this.linksService.usersUrl}/${slug}`;
    return this.http.get<Message>(url);
  }

  getParticipantByUser(slug: string): Observable<Participant>{
    const url = `${this.linksService.usersUrl}/${slug}`;
    return this.http.get<Participant>(url);
  }

  getConversationsById(id: number): Observable<Conversation>{
    const url = `${this.linksService.conversationUrl}/${id}`;
    return this.http.get<Conversation>(url);
  }

  getparticipantsByConv(id: number) {
    const url = `${this.linksService.conversationUrl}/${id}`;
    return this.http.get<Participant>(url);
  }

  getParticipants() {
    this.http.get<Participant>(this.linksService.participantUrl)
  }

  getMessagesByConversation(id: number | undefined): Observable<Message>{
    const url = `${this.linksService.conversationUrl}/${id}`;
    return this.http.get<Message>(url);
  }

  getParticipantsById(id: number): Observable<Participant>{
    const url = `${this.linksService.participantUrl}/${id}`;
    return this.http.get<Participant>(url);
  }

  getParticipantById(userId: number){
    let params = new HttpParams()
      .set('user.id', userId);
    return this.http.get<Participant>(this.apiService.participantUrl, { params })
  }

  getConversationsIds(messages: Message[] | undefined): number[] {
    let convs: any = [];
    let convsArray: any = [];

    if(messages){
      for(let i = 0; i < messages.length; i++) {
          convs.push(messages[i].conversation.id);
        }
        convsArray = convs.sort();
      for(let i = 0; i < convs.length - 1; i++){
        if(convsArray[i + 1] === convsArray[i]) {
          convsArray.splice(i + 1, 1);
        }
      }
    }

    return convsArray;
  }

  postMessage(message: MsgPost){
    return this.http.post<MsgPost>(this.linksService.messageUrl, message);
  }

  postConversation(conversation: PostConversation) {
    return this.http.post<PostConversation>(this.apiService.conversationUrl, conversation);
  }

  postParticipant(participant: PostParticipant) {
    return this.http.post<PostParticipant>(this.apiService.participantUrl, participant);
  }

  getConvMaxId() {
    const url = `${this.linksService.conversationUrl}/countMax`;
    return this.http.get<any>(url);
  }

  getParticipMaxId() {
    const url = `${this.linksService.participantUrl}/count`;
    return this.http.get<any>(url);
  }
}
