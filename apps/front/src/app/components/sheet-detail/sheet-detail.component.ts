import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Sheet } from 'src/app/model/sheet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sheet-detail',
  templateUrl: './sheet-detail.component.html',
  styleUrls: ['./sheet-detail.component.scss']
})
export class SheetDetailComponent implements OnInit {

  sheet?: Sheet;
  currentDate: number = Date.now();


  constructor(private route: ActivatedRoute, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.getSheetBySlug();
  }

  getSheetBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('sheet')!;

    this.apiService.getSheetBySlug(slug)
      .subscribe(sheet => this.sheet = sheet);
  }
}
