import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message, MsgPost } from 'src/app/model/message';
import { Participant } from 'src/app/model/participant';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { MercureService } from 'src/app/services/mercure/mercure.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';


@Component({
  selector: 'app-messenger-send-form',
  templateUrl: './messenger-send-form.component.html',
  styleUrls: ['./messenger-send-form.component.scss']
})
export class MessengerSendFormComponent {
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
    this.messenger.postMessage(message).subscribe(
      success => {
        this.textareaValue = '',
        alert("Message bien envoyé.");
      },
      error => alert('Un problème est survenu.')
    );
    // console.log(message);

  }
}
