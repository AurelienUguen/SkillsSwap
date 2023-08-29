import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, delay } from 'rxjs';
import { Conversation } from 'src/app/model/conversation';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from 'src/app/model/message';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';''
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { Participant } from 'src/app/model/participant';
import { LoginService } from 'src/app/services/login/login.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent {
  private subscription: Subscription;
  private mySpace: Subscription;

  public route!: ActivatedRoute;
  public slug!: string;
  public status?: string;
  public sheetDetails?: any = {};
  public user!: User;
  public userName?: string;
  public currentUser!: Subscription;
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

    ngOnInit() {
      this.sheetDetails = history.state;
    }

    getParticipantByUser(slug: string) {
      this.messenger.getParticipantByUser(slug)
      .subscribe((participants: any) => {
        this.userParticipants = participants['participants'];
      })
    }
}
