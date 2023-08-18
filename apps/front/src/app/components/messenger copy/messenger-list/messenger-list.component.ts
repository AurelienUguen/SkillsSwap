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
export class MessengerListComponent implements OnInit {
  @Input() teacherSlug?: any = {};

  private subscription: Subscription;
  private messengerList: Subscription;

  public currentConvId?: number;
  public isActive: boolean = false;
  public slug!: string;
  public status?: string;
  public teacherParticipants?: Participant[];
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
      this.getUserConnectedParticipants(this.slug);
    }

  ngOnInit(): void {
    this.getUserBySlug();
    this.getTeacherParticipants(this.teacherSlug['teacherSlug']);
  }


  getUserBySlug(): void {
    this.apiService.getUserBySlug(this.slug)
      .subscribe(user => {
        console.log(this.user = user);
      });
  }

  getUserConnectedParticipants(slug: string) {
    this.messenger.getParticipantByUser(slug)
    .subscribe((participants: any) => {
      console.log(this.userParticipants = participants['participants']);
    })
  }

  getTeacherParticipants(slug: string) {
    this.messenger.getParticipantByUser(slug)
    .subscribe((participants: any) => {
      this.teacherParticipants = participants['participants'];
      this.activateTeachersConversation();
    })
  }

  activateTeachersConversation() {
    for(let i = 0; i < this.userParticipants?.length!; i++) {
      for(let j = 0; j < this.teacherParticipants?.length!; j++) {
        if(this.teacherParticipants?.[j].conversation.id === this.userParticipants?.[i].conversation.id) {
          this.getMessagesByConversation(this.teacherParticipants?.[j].conversation.id!);
        }
      }
    }
  }

  getMessagesByConversation(id: number) {
    this.messenger.getMessagesByConversation(id)
      .subscribe((messages: any) => {
        this.currentMessages = messages['messages'].reverse();
      })
    console.log(this.currentConvId = id);
    this.isActive = true;
  }

}
