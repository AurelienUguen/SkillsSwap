import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private subscription: Subscription;

  public status?: string;
  public userSlug?:string | null;
  public userFirstname?:string | null;

  constructor(private isConnected: LoginService){
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
      if(status === "connected"){
        this.userSlug = localStorage.getItem('slug');
        this.userFirstname = localStorage.getItem('firstname');
      }
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
