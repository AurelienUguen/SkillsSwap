import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/model/lesson';
import { Sheet } from 'src/app/model/sheet';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.scss']
})
export class PersonalSpaceComponent {

  user?: User

  userId = Number(localStorage.getItem('id'));
  userFirstname = localStorage.getItem('firstname');
  userLastname = localStorage.getItem('lastname');
  userEmail = localStorage.getItem('email');
  userCity = localStorage.getItem('city');
  userDistrict = localStorage.getItem('district');

  sheets: Sheet[] = [];
  lessons: Lesson[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }


  ngOnInit(): void {
    this.getUserBySlug();
    this.getSheets();
    this.getLessons();
  }

  getUserBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('user')!;

    this.apiService.getUserBySlug(slug)
      .subscribe(user => this.user = user);
  }

  getSheets() {
    return this.apiService.getSheets()
    .subscribe((sheets: any) => this.sheets = sheets['hydra:member']);
  }

  getLessons() {
    return this.apiService.getLessons()
    .subscribe((lessons: any) => this.lessons = lessons['hydra:member']);
  }

}
