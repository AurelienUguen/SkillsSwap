import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class MessengerListDetailComponent implements OnInit{
  @Input() conversationId!: number;
  @Input() currentUser!: User;

  private subscription: Subscription;
  private messengerListDetails: Subscription;

  public participants?: [];
  public participantFirstname!: string;
  public participantLastname!: string;
  public slug!: string;
  public status?: string;
  public user!: User;
  public userName?: string;

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

  ngOnInit() {
    this.getParticipantsByConv(this.conversationId);
  }

  getParticipantsByConv(id: number) {
    this.messenger.getparticipantsByConv(id)
      .subscribe((participants: any) => {
        this.participants = participants['participants'];
        this.getConversationsByUser(this.participants!);
      })
  }

  getConversationsByUser(participants: []) {
    participants.forEach((el: any) => {
      if(!(el['user'].slice(11) === this.slug || el['user'].slice(11) === undefined)) {
        this.participantFirstname = el['user'].slice(11).split("-")[0];
        this.participantLastname = el['user'].slice(11).split("-")[1];
      }
    });
  }

}
