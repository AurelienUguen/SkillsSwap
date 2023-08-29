import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { Sheet } from 'src/app/model/sheet';
import { userConnected } from 'src/app/model/user';
import { mySpaceService } from 'src/app/services/mySpaceObserver/mySpaceObserver.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sheet-detail',
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.scss']
})
export class SheetDetailComponent implements OnInit {
  private subscription: Subscription;
  private sheetDetailUser: Subscription;

  public sheetDetails = {teacherSlug: '', selectedSheet: <Sheet> {}, hasClicked: true};
  public sheet?: Sheet;
  public slug!: string;
  public status?: string;
  public userName?: string;
  languageToggle = true;
  positionToggle = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private isConnected: LoginService,
    private mySpaceObs: mySpaceService
    ){
      this.subscription = this.isConnected.getStatusObservable().subscribe((status: string) => {
      this.status = status;
    });
    this.sheetDetailUser = this.mySpaceObs.getStatusObservable().subscribe((user: userConnected) => {
      this.slug = user.slug;
      this.userName = user.firstname;
    });
  }

  ngOnInit(): void {
    this.getSheetBySlug();
  }

  getSheetBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('sheet')!;

    this.apiService.getSheetBySlug(slug)
      .subscribe(sheet => {
        this.sheet = sheet;
        this.sheetDetails['teacherSlug'] = this.sheet.user.slug;
        this.sheetDetails['selectedSheet'] = this.sheet;
      });
  }

  showLanguage() {
    this.languageToggle = !this.languageToggle;
  }

  showPosition() {
    this.positionToggle = !this.positionToggle;
  }
}
