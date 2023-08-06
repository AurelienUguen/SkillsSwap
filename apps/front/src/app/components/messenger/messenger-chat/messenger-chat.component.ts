import { Component, Input, OnChanges, OnInit } from '@angular/core';
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

  MessageForm = new FormGroup({
    message: new FormControl(),
  })

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
    }

    onSubmitMsg(){
      if(this.currentConversationId === null || this.currentConversationId === undefined){
        alert("Vous devez d'abord sélectionner une conversation.");
      }
      const message: MsgPost = {
        title: "Test",
        content: this.MessageForm.value.message,
        owner: `/api/users/${this.slug}`,
        conversation: `/api/conversations/${this.currentConversationId}`,
        is_read: false,
        created_at: new Date(),
      }
      this.messenger.postMessage(message).subscribe();
      console.log(message);
    }
}
