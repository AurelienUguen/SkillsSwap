import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private isConnected: Subject<string> = new BehaviorSubject<string>('OFF');
  private isConnected: Subject<string> = new Subject<string>;


  constructor() { }

  getStatusObservable() {
    return this.isConnected.asObservable();
  }

  updateStatus(status: string) {
    this.isConnected.next(status);
  }
}
