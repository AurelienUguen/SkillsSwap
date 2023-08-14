import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/model/message';
import { Participant } from 'src/app/model/participant';
import { User, userConnected } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login/login.service';
import { MercureService } from 'src/app/services/mercure/mercure.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-messenger-chat',
  templateUrl: './messenger-chat.component.html',
  styleUrls: ['./messenger-chat.component.scss']
})
export class MessengerChatComponent implements OnInit {

  @Input() currentMessages?: Message[];
  @Input() currentConversationId?: number;

  private subscription: Subscription;
  private messengerChat: Subscription;

  public slug!: string;
  public status?: string;
  public user?: User;
  public userName?: string;
  public userMessages?: Message[];
  public userParticipants?: Participant[];
  public textareaValue?: string;

  public data: any;

  constructor(
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private mercureService: MercureService,
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
        this.status = status;
      });
      this.messengerChat = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
        this.userName = user.firstname;
      });
    }

    ngOnInit(): void {
      this.getMessageEvent();
    }

    getMessageEvent() {
      this.mercureService.getUpdatedMessage(this.mercureService.getSourceMessage())
      .subscribe((updatedMessage: any) => {

        const newData = JSON.parse(updatedMessage.data);

        if (newData) {
          this.currentMessages?.push(newData);
        }

        console.log(this.currentMessages);
      });
    }
}
