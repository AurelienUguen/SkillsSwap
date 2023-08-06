import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Conversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';
import { Participant } from 'src/app/model/participant';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-messenger-chat',
  templateUrl: './messenger-chat.component.html',
  styleUrls: ['./messenger-chat.component.scss']
})
export class MessengerChatComponent implements OnChanges{
  @Input() currentMessages?: Message[];

  private subscription: Subscription;
  private mySpace: Subscription;

  public slug!: string;
  public status?: string;
  // public user!: User;
  public userName?: string;
  // public userConvs?: Conversation;
  public userMessages?: Message[];
  public userParticipants?: Participant[];

  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private messenger: MessengerService,
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
        this.status = status;
      });
      this.mySpace = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
        this.userName = user.firstname;
      });
    }

    ngOnChanges(): void {
      console.log(this.currentMessages);
      // this.getUserBySlug();
      // this.getMessagesByUser(this.slug);
      // this.getParticipantByUser(this.slug);
    }

    // getMessagesByUser(slug: string) {
    //   this.messenger.getMessagesByUser(slug)
    //   .subscribe((messages: any) => {
    //     console.log(this.userMessages = messages['messages']);
    //   })
    // }
}
