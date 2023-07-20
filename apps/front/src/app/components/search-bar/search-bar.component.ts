import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  currentSearch: string = '';
  searchResults?: any[];


  constructor(private apiService: ApiService) {

  }

  searchCategory() {

    const filterSearch = {
      name: this.currentSearch,
    };

    this.apiService.getFilteredCategory(filterSearch)
      .subscribe((category: any) => {
        this.searchResults = category['hydra:member'];
      });

      console.log(this.searchResults)
  }
}
