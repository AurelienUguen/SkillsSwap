import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Location } from '@angular/common';

import { Category } from 'src/app/model/category';
import { Subject } from 'src/app/model/subject';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {

  category!: Category;
  subjects: Subject[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) {

  }


  ngOnInit(): void {
    this.getCategory();
    this.getSubjects();
  }

  getCategory(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.apiService.getCategory(slug)
      .subscribe(category => this.category = category);
  }

  getSubjects() {
    return this.apiService.getSubjects()
    .subscribe((subjects: any) => this.subjects = subjects['hydra:member']);
  }

  goBack(): void {
    this.location.back();
  }
}
