import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User, UserAuth } from 'src/app/model/user';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private isConnected: Subject<string> = new BehaviorSubject<string>('disconnected');
  private isConnected: Subject<string> = new Subject<string>;
  private apiUsers: string = `https://api.skillswap.wip/api/users`


  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
    ){}

  getStatusObservable() {
    return this.isConnected.asObservable();
  }

  updateStatus(status: string) {
    this.isConnected.next(status);
  }

  authentication(user: UserAuth){
    console.log(user);
    this.apiService.postAuth(user).subscribe(
      data => {
        console.log("Wheeeeee");

        this.http.get(this.apiUsers).subscribe((users: any) => {
          const hydras = users['hydra:member'];
          console.log(hydras);
          for(let i = 0;i < hydras.length;i++){
            if(user.email === hydras[i].email){
              for (const prop in hydras[i]){
                if (prop === "firstname" || prop === 'slug') localStorage.setItem(prop,hydras[i][prop]);
              }
            }
          }
        });
        
        localStorage.setItem("connexionStatus","connected");
        this.updateStatus("connected");
        this.router.navigateByUrl("/");
      },
      err => {
        console.log("Nooooooo");
        localStorage.setItem("connexionStatus","disconnected");
        this.updateStatus("disconnected");
        console.log(err);
      }
    )}
}
