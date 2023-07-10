import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';

import { Location } from '@angular/common';

import { Course } from 'src/app/model/course';
import { Subject } from 'src/app/model/subject';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  course?: Course;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) {

  }

  ngOnInit() {
    this.getCourseBySlug();
  }

  getCourseBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('course')!;

    this.apiService.getCourseBySlug(slug)
      .subscribe(course => this.course = course);
  }

  goBack(): void {
    this.location.back();
  }
}
