import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserAuth } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})
export class ConnectorComponent implements OnInit, OnDestroy{

  private subscription: Subscription;

  public status?: string;

  constructor(
    private router: Router,
    private isConnected: LoginService,
    private apiService: ApiService
    ){
    this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
  }

  ngOnInit(){
      let user: UserAuth = {
      email: sessionStorage.getItem(`email`),
      password: sessionStorage.getItem(`password`)
    }
    this.isConnected.authentication(user);
  }
  ngOnDestroy(){}
}
