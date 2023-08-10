import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, delay } from 'rxjs';
import { Conversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
// import { LoginService } from 'src/app/services/login/login.service';
// import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { Participant } from 'src/app/model/participant';
import { LoginService } from 'src/app/services/login/login.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';
import { MercureService } from 'src/app/services/mercure/mercure.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent {
  private subscription: Subscription;
  private mySpace: Subscription;

  public slug!: string;
  public status?: string;
  public user!: User;
  public userName?: string;
  public currentUser?: any[];
  public userMessages?: Message[];
  public userParticipants?: Participant[];

  public updatedMessage: any;

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
      this.mySpace = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
        this.userName = user.firstname;
      });
    }

    ngOnInit() {
      // this.getMessagesByUser(this.slug);
      // this.getParticipantByUser(this.slug);
      this.getMessageEvent();
    }

    getParticipantByUser(slug: string) {
      this.messenger.getParticipantByUser(slug)
      .subscribe((participants: any) => {
        console.log(this.userParticipants = participants['participants']);
      })
    }

    getMessagesByUser(slug: string) {
      this.messenger.getMessagesByUser(slug)
      .subscribe((messages: any) => {
        console.log(this.userMessages = messages['messages']);
      })
    }

    // Mercure Update

    getMessageEvent() {
      this.mercureService.getUpdatedMessage(this.mercureService.getSourceMessage())
      .subscribe((updatedMessage: any) => console.log(this.updatedMessage = updatedMessage['data']));
    }
}

