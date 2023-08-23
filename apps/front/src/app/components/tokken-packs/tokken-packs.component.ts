import { Component,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-tokken-packs',
  templateUrl: './tokken-packs.component.html',
  styleUrls: ['./tokken-packs.component.scss']
})

export class TokkenPacksComponent implements OnInit {

  private subscription: Subscription;
  public user?: User;
  public status?: string;
  private slug!: string;
  private userID!: string;
  private mySpace: Subscription;
  private userObject: Subscription;

  constructor(
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private userObs: mySpaceService,
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
        this.status = status;
      });
      this.mySpace = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
        this.slug = user.slug;
      });
      this.userObject = this.userObs.getStatusObservable().subscribe((user: userConnected) => {this.userID = user.slug;});
    }

    ngOnInit(): void {
      this.getUserBySlug();
      console.log(this.user);
      console.log(this.userID);
  }

  getUserBySlug() {
    this.apiService.getUserBySlug(this.userID)
      .subscribe(user => {
        this.user = user;
      });
  }
}
