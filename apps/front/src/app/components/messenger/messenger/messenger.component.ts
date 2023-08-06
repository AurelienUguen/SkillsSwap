import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { Conversation } from 'src/app/model/conversation';
import { Message } from 'src/app/model/message';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
// import { LoginService } from 'src/app/services/login/login.service';
// import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { Participant } from 'src/app/model/participant';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {
  private slug!: string;

  public status?: string;
  public user?: User;
  public currentUser?: any[];
  public userMessages?: Message[];
  public userParticipants?: Participant[];

  constructor(
    private apiService: ApiService,
    private messenger: MessengerService,
    ){}

    ngOnInit() {
      // this.getUserBySlug();
      this.getMessagesByUser(this.slug);
      this.getParticipantByUser(this.slug);
    }

    // getUserBySlug(): void {
    //   this.apiService.getUserBySlug(this.slug)
    //     .subscribe(user => {
    //       this.user = user;
    //     });
    // }

    getMessagesByUser(slug: string) {
      this.messenger.getMessagesByUser(slug)
      .subscribe((messages: any) => {
        console.log(this.userMessages = messages['messages']);
      })
    }

    getParticipantByUser(slug: string) {
      this.messenger.getParticipantByUser(slug)
      .subscribe((participants: any) => {
        console.log(this.userParticipants = participants['participants']);
      })
    }
}
