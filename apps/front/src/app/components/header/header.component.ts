import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { userConnected } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login/login.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private subscription: Subscription;
  private mySpace: Subscription;

  public status?: string;
  public slug?: string;
  public userName?: string;

  constructor(
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService
    ){
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
    this.mySpace = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
      this.slug = user.slug;
      this.userName = user.firstname;
    });
  }

  ngOnInit(){
    this.isConnected.updateStatus('disconnected');
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.isConnected.updateStatus('disconnected');
    console.log("ByBye !!")
  }

  ngOnDestroy() {
    sessionStorage.clear();
    localStorage.clear();
    this.subscription.unsubscribe();
  }
}
