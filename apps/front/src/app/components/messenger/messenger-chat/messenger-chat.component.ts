import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/model/message';
import { Participant } from 'src/app/model/participant';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
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
    private apiService: ApiService,
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
      this.getUserBySlug();
    }

    ngOnInit(): void {
      // this.getUserBySlug();
      this.getMessageEvent();
    }

    getUserBySlug(): void {
      this.apiService.getUserBySlug(this.slug)
        .subscribe(user => {
          console.log(this.user = user);
        });
    }

    typeOf(val: any) {
      return console.log(typeof val);
    }

    toString(val: any): string{
      return val.slice(11);
    }

    reverseIt(val: Message[] | undefined): Message[] | undefined {
      return val?.reverse();
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
