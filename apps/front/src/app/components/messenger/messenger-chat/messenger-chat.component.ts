import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Conversation } from 'src/app/model/conversation';
import { Message, MsgPost } from 'src/app/model/message';
import { Participant } from 'src/app/model/participant';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { MercureService } from 'src/app/services/mercure/mercure.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-messenger-chat',
  templateUrl: './messenger-chat.component.html',
  styleUrls: ['./messenger-chat.component.scss']
})
export class MessengerChatComponent implements OnInit, OnChanges{
  @Input() currentMessages?: Message[];
  @Input() currentConversationId?: number;
  @Input() sheetDetails: any;

  private subscription: Subscription;
  private messengerChat: Subscription;

  public dates: string[] = [];

  public slug!: string;
  public status?: string;
  public user?: User;
  public userName?: string;
  public userMessages?: Message[];
  public userParticipants?: Participant[];
  public textareaValue?: string;


  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private messenger: MessengerService,
    private mercureService: MercureService,
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
        this.status = status;
      });
      this.messengerChat = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
        this.userName = user.firstname;
        this.getUserBySlug();
      });
    }

    ngOnInit(): void {

      this.getMessageEvent();
    }

    ngOnChanges(): void {
      this.getUserBySlug();
      this.getUniqueDates(this.currentMessages);
    }

    getUserBySlug(): void {
      this.apiService.getUserBySlug(this.slug)
        .subscribe(user => {
          this.user = user;
        });
    }

    typeOf(val: any) {
      return typeof val;
    }

    toString(val: any): string{
      return val.slice(11);
    }

    reverseIt(val: Message[] | undefined): Message[] | undefined {
      return val?.reverse();
    }

    getUniqueDates(messages: Message[] | undefined){
      this.dates = [];
      messages?.forEach((el: Message) => {
        this.dates.push(el.createdAt.toString().substring(0, 10));
      });
      console.log(this.dates);
    }

    getMessageEvent() {
      this.mercureService.getUpdatedMessage(this.mercureService.getSourceMessage())
      .subscribe((updatedMessage: any) => {

        const newData = JSON.parse(updatedMessage.data);

        if (newData) {
          this.currentMessages?.unshift(newData);
        }

        console.log(this.currentMessages);
      });
    }


}
