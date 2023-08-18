import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Conversation } from 'src/app/model/conversation';
import { Message, MsgPost } from 'src/app/model/message';
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


  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private messenger: MessengerService,
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
        this.status = status;
      });
      this.messengerChat = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
        this.userName = user.firstname;
      });
    }

    ngOnChanges(): void {
      this.getUserBySlug();
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

}
