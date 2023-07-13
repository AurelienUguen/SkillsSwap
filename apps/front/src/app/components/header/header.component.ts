import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public status?: string;
  private subscription: Subscription;

  constructor(private isConnected: LoginService){
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
  }

  ngOnInit(){
    this.isConnected.updateStatus('disconnected');
    console.log(this.status);
  }

  logout(){
    localStorage.clear();
    this.isConnected.updateStatus('disconnected');
    console.log("ByBye !!")
  }

  ngOnDestroy() {
    localStorage.clear();
    this.subscription.unsubscribe();
  }
}
