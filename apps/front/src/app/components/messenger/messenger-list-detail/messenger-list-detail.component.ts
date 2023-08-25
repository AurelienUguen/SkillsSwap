import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Conversation } from 'src/app/model/conversation';
import { Participant } from 'src/app/model/participant';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';

import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-messenger-list-detail',
  templateUrl: './messenger-list-detail.component.html',
  styleUrls: ['./messenger-list-detail.component.scss']
})
export class MessengerListDetailComponent implements OnInit, OnChanges{
  @Input() conversationId!: number;

  private subscription: Subscription;
  private messengerListDetails: Subscription;

  public participants?: [];
  public participantFirstname!: string;
  public participantLastname!: string;
  public slug!: string;
  public status?: string;
  public user!: User;
  public userName?: string;
  // public participId!: number;

  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private messenger: MessengerService,
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
        this.status = status;
      });
      this.messengerListDetails = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
        this.userName = user.firstname;
      });

    }
  ngOnChanges() {
    this.getParticipantsByConv(this.conversationId);
  }

  ngOnInit() {
    console.log(this.conversationId);
  }

  getParticipantsByConv(id: number) {
    this.messenger.getparticipantsByConv(id)
      .subscribe((participants: any) => {
        this.participants = participants['participants'];
        this.getConversationsByUser(this.participants!);
      })
  }

  getConversationsByUser(participants: []) {
    console.log(participants);
    participants.forEach(el => {
      if(!(el['user']['slug'] === this.slug || el['user']['slug'] === undefined)) {
        this.participantFirstname = el['user']['firstname'];
        this.participantLastname = el['user']['lastname'];
      }
    });
  }
}
