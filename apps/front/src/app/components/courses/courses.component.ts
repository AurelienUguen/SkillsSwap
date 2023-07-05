import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Course } from 'src/app/model/course';
import { Subject } from 'src/app/model/subject';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  subject!: Subject;
  courses: Course[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) {

  }

  ngOnInit() {
    this.getSubject();
    this.getCourses();
  }

  getSubject(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;

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
