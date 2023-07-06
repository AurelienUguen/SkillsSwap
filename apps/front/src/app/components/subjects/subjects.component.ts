
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';

import { Location } from '@angular/common';

import { Subject } from 'src/app/model/subject';
import { Course } from 'src/app/model/course';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subject!: Subject;
  courses: Course[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) {

  }

  ngOnInit() {
    this.getSubjectBySlug();
    this.getCourses();
  }

  getSubjectBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('subject')!;

    this.apiService.getSubjectBySlug(slug)
      .subscribe(subject => this.subject = subject);
  }

  getCourses() {
    return this.apiService.getCourses()
    .subscribe((courses: any) => this.courses = courses['hydra:member']);
  }

  goBack(): void {
    this.location.back();
  }
}
