import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent {

  category!: Category;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }


  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.apiService.getCategory(slug)
      .subscribe(category => this.category = category);
  }

}
