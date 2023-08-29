import { Injectable } from '@angular/core';
import { Subject, Subscription, tap } from 'rxjs';
import { UserAuth } from 'src/app/model/user';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isConnected: Subject<string> = new Subject<string>;
  private apiUsers: string = `https://api.skillswap.wip/api/users`;
  private mySpace: Subscription;


  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    private mySpaceObs: mySpaceService
    ){
      this.mySpace = this.mySpaceObs.getStatusObservable().subscribe()
    }

  getStatusObservable() {
    return this.isConnected.asObservable();
  }

  updateStatus(status: string) {
    this.isConnected.next(status);
  }

  authentication(user: UserAuth){
    this.apiService.postAuth(user).subscribe(
      sucess => {
        this.http.get(this.apiUsers).subscribe((users: any) => {

          const hydras = users['hydra:member'];
          for(let i = 0;i < hydras.length;i++){
            if(user.email === hydras[i].email){
              const userConnect = {
                slug: hydras[i].slug,
                firstname: hydras[i].firstname
              }
              this.mySpaceObs.updateStatus(userConnect);
              console.log("Vous êtes connecté");
              this.updateStatus("connected");
              this.router.navigateByUrl("/");
            }
          }
        });
      },
      error => {
        console.log("Un problème est survenu");
        this.updateStatus("disconnected");
        console.log(error);
      }
    )}

    logout():void{
      sessionStorage.clear();
      localStorage.clear();
      this.updateStatus("disconnected");
      console.log("ByBye !!")
      this.router.navigateByUrl("/");
    }
}
