import { Component, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';
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
  public isMenuOpen = false;

  private subscription: Subscription;
  private mySpace: Subscription;

  public status?: string;
  public slug?: string;
  public userName?: string;

  constructor(
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService,
    private renderer: Renderer2,
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
    this.mySpaceObs.updateStatus({
      slug: "slug",
      firstname: "firstname",
    })
    this.isConnected.logout();
  }

  ngOnDestroy() {
    this.isConnected.logout();
    this.subscription.unsubscribe();
  }

  burgerMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

