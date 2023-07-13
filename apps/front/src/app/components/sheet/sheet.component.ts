import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Sheet } from 'src/app/model/sheet';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  users: User[] = [];
  sheets: Sheet[] = [];

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.getSheets();
  }

  getUsers() {
    return this.apiService.getUsers()
    .subscribe((users: any) => this.users = users['hydra:member']);
  }

  getSheets() {
    return this.apiService.getSheets()
    .subscribe((sheets: any) => this.sheets = sheets['hydra:member']);
  }

}
