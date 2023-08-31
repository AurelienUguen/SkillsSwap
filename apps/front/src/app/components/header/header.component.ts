import { Component, Renderer2, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
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
  public slug!: string;
  public user!: User;
  public userName?: string;

  constructor(
    private apiService: ApiService,
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

  ngOnChanges(){
    this.getUserBySlug()
    this.onRefreshToken(this.user);
  }

  ngOnInit(){
    this.isConnected.updateStatus('disconnected');
  }

  getUserBySlug() {
    this.apiService.getUserBySlug(this.slug)
      .subscribe(user => {
        this.user = user;
      });
  }

  logout(){
    this.mySpaceObs.updateStatus({
      slug: "slug",
      firstname: "firstname",
    })
    this.isConnected.logout();
  }

  onRefreshToken(user: User) {
    this.apiService.onRefreshToken(user).subscribe();
  }

  ngOnDestroy() {
    this.isConnected.logout();
    this.subscription.unsubscribe();
  }

  burgerMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

