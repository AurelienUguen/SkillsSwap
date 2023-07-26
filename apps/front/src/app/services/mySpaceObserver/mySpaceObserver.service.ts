import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { userConnected } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class mySpaceService {

  private mySpaceStatus: Subject<userConnected> = new BehaviorSubject<userConnected>({slug:'slug',firstname:'Votre Profile'});

  getStatusObservable() {
    return this.mySpaceStatus.asObservable();
  }

  updateStatus(user: userConnected) {
    this.mySpaceStatus.next(user);
  }
}
