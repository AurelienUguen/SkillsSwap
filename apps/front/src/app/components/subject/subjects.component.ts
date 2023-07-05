import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api.service';
import { Subject } from '../../model/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[] = [];

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects() {
    return this.apiService.getSubjects()
    .subscribe((subjects: any) => this.subjects = subjects['hydra:member']);
  }

}
