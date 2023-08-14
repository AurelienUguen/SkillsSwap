import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/model/message';
import { Participant } from 'src/app/model/participant';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-messenger-list',
  templateUrl: './messenger-list.component.html',
  styleUrls: ['./messenger-list.component.scss']
})
export class MessengerListComponent implements OnInit, OnChanges{

  private subscription: Subscription;
  private messengerList: Subscription;

  public currentConvId?: number;
  public isActive: boolean = false;
  public slug!: string;
  public status?: string;
  public user!: User;
  public userName?: string;
  public userMessages?: Message[];
  public currentMessages?: Message[];
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
      this.messengerList = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
        this.userName = user.firstname;
      });
      this.getParticipantByUser(this.slug);
    }

  ngOnInit(): void {
    this.getUserBySlug();
    // this.getMessagesByUser(this.user.slug);
  }

  ngOnChanges(): void {
  }

  getUserBySlug(): void {
    this.apiService.getUserBySlug(this.slug)
      .subscribe(user => {
        this.user = user;
      });
  }

  getParticipantByUser(slug: string) {
    this.messenger.getParticipantByUser(slug)
    .subscribe((participants: any) => {
      this.userParticipants = participants['participants'];
    })
  }

  getMessagesByConversation(id: number) {
    this.messenger.getMessagesByConversation(id)
      .subscribe((messages: any) => {
        this.currentMessages = messages['messages'];
      })
    this.currentConvId = id;
    this.isActive = true;
  }



  // getMessagesByUser(slug: string) {
  //   this.messenger.getMessagesByUser(slug)
  //   .subscribe((messages: any) => {
  //     console.log(this.userMessages = messages['messages']);
  //   })
  // }
}
