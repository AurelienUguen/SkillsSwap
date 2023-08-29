import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { Subscription, concat } from 'rxjs';
import { delay, first, take, tap } from 'rxjs/operators';
import { PostConversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';
import { Participant, PostParticipant } from 'src/app/model/participant';
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
  @Input() sheetDetails: any = {};

  private subscription: Subscription;
  private messengerList: Subscription;

  public currentConvId?: number;
  public convMaxId!: number;
  public participMaxId!: number;
  public isActive = false;
  public slug!: string;
  public status?: string;
  public participants?: Participant;
  public teacherParticipants?: Participant[];
  public user!: User;
  public userName?: string;
  public teacher!: User;
  // public userMessages?: Message[];
  public currentMessages?: Message[];
  public userParticipants?: Participant[];
  public teacherMessages!: Message[];
  public currentUserMessages!: Message[];
  public userId!: number;
  public isNewConvPosted = false;
  public hasClicked = {'hasClicked': false};

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
      // console.log(this.sheetDetails);
      // this.hasClicked = this.sheetDetails['hasClicked'];

    }

  ngOnInit(): void {
    this.getUserBySlug();
    this.getTeacherBySlug();
    this.hasClicked['hasClicked'] = this.sheetDetails['hasClicked'];
    console.log(this.sheetDetails);

    if(this.hasClicked['hasClicked']) {
      setTimeout(() => {
        this.getTeacherParticipants(this.sheetDetails['teacherSlug']);
      }, 200);

      this.getTeacherMessages(this.sheetDetails['teacherSlug']);

    }
  }

  getUserBySlug(): void {
    this.apiService.getUserBySlug(this.slug)
      .subscribe(user => {
        this.user = user;
        // this.getParticipantById(this.user.id)
      });
  }

  getTeacherBySlug(): void {
    this.apiService.getUserBySlug(this.sheetDetails['teacherSlug'])
      .subscribe(teacher => {
        console.log(this.teacher = teacher);
      });
  }

  getParticipantById(id: number) {
    this.messenger.getParticipantsById(id)
      .subscribe((userId: any) => console.log(this.userId = userId)
      )
  }

  getUserConnectedParticipants(slug: string) {
    this.messenger.getParticipantByUser(slug)
    .subscribe((participants: any) => {
      console.log(this.userParticipants = participants['participants']);
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

  getTeacherParticipants(slug: string) {
    this.messenger.getParticipantByUser(slug)
    .subscribe((participants: any) => {
      this.teacherParticipants = participants['participants'];
      this.activateTeachersConversation();
      if(this.isActive === false){
        this.createConversation();
      }
    })
  }

  getMessagesByConversation(id: number) {
    this.messenger.getMessagesByConversation(id)
      .subscribe((messages: any) => {
        this.currentMessages = messages['messages'].reverse();
      })
    console.log(this.currentConvId = id);
    this.isActive = true;
  }

  getTeacherMessages(slug: string) {
    concat(this.messenger.getMessagesByUser(slug))
      .subscribe((messages: any) => {
        console.log(this.teacherMessages = messages['messages'])
    })
  }

  getTeacherMessagesNewConversation(slug: string) {
    this.messenger.getMessagesByUser(slug)
      .subscribe((messages: any) => {
        console.log(this.teacherMessages = messages['messages'])
    })
  }

  postConversation(maxId: number): void | any {
    const createConv: PostConversation = {
      convId: maxId + 1,
    }
      this.messenger.postConversation(createConv)
      .subscribe();
    console.log(createConv);
    }


  postParticipant(participMaxId: number, convMaxId: number): void | any {
    const particip1: PostParticipant = {
      user: `/api/users/${this.user.slug}`,
      conversation: `/api/conversations/${convMaxId + 1}`
    }
    const particip2: PostParticipant = {
      user: `/api/users/${this.teacher.slug}`,
      conversation: `/api/conversations/${convMaxId + 1}`
    }
    console.log(particip1);
    console.log(particip2);

      concat(
        this.messenger.postParticipant(particip1),
        this.messenger.postParticipant(particip2),
        )
        .subscribe();
        this.hasClicked['hasClicked'] = false;
  }

    createParticipant(convId: number) {
      return this.messenger.getParticipMaxId()
        .subscribe((id: any) => {
            this.participMaxId = id['hydra:member'][0].id,
            this.postParticipant(this.participMaxId, convId)
      })
    }

    createConversation() {
      return this.messenger.getConvMaxId()
        .subscribe((id: any) => {
            this.convMaxId = id['hydra:member'][0].id,
            this.postConversation(this.convMaxId),
            this.createParticipant(this.convMaxId);
        })
    }

}
