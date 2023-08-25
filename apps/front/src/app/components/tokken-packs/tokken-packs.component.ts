import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, userConnected } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';

@Component({
  selector: 'app-tokken-packs',
  templateUrl: './tokken-packs.component.html',
  styleUrls: ['./tokken-packs.component.scss']
})

export class TokkenPacksComponent implements OnInit {

  public user?: User;
  public status?: string;
  private userSlug!: string;
  private userObject: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userObs: mySpaceService,
    ){
      this.userObject = this.userObs.getStatusObservable().subscribe((user: userConnected) => {this.userSlug = user.slug;});
    }

    ngOnInit(): void {
      this.getUserBySlug(this.userSlug);
  }

  getUserBySlug(slug: string) {
    return this.apiService.getUserBySlug(slug).subscribe(user => {return this.user = user;});
  }
  
  fileTonFrickBatard(pack:string,tokkens:number){
    const buyerSLUG = this.user?.slug;
    if (typeof buyerSLUG === 'string') {
        const updateTokkens = {
            tokken: tokkens,
            plaintextPassword: 'adminUpdateProfile.911',
            city: this.user?.city,
            district: this.user?.district,
            description: this.user?.description,
            email: this.user?.email,
            firstname: this.user?.firstname,
            lastname: this.user?.lastname,
            phone: this.user?.phone,
            roles:this.user?.roles
        }
        this.apiService.updateUser(buyerSLUG, updateTokkens).subscribe();
        setTimeout(() => {
          if(pack == "standard"){
            window.location.href = "https://buy.stripe.com/test_cN27vj8tA83Odsk288";
          }
          if(pack == "smart"){
            window.location.href = "https://buy.stripe.com/test_5kA9Dr8tAescdsk6op";
          }
          if(pack == "genius"){
            window.location.href = "https://buy.stripe.com/test_7sI16VcJQ3Ny9c48wy";
          }
        }, 1000);
    }
  }
}
