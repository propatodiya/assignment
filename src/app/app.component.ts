import { Component, OnInit } from '@angular/core';
import { MockResponseModel } from './model/mock.model';
import { MockService } from './service/mock.service';
import { FilterPipe } from './pipes/filter.pipe';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public mockResponse: Array<MockResponseModel> = [];
  public searchText: string;
  public sortBy = '';
  constructor(private mockService: MockService) {
  }

  ngOnInit() {
    if (!!localStorage.getItem('search')) {
      this.searchText = localStorage.getItem('search');
    }
    if (!!localStorage.getItem('sortBy')) {
      this.sortBy = localStorage.getItem('sortBy');
    }
    this.mockService.getList().subscribe(async(response: MockResponseModel[]) => {
      await response.forEach(item => {
        this.getImageSrc(item.image).then((src) => {
          item.image = src;
        });
      });
      this.mockResponse = response as MockResponseModel[];
      if (this.searchText) {
        new FilterPipe().transform(response, localStorage.getItem('search'));
      }
      if (this.sortBy) {
        this.sortData();
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  getImageSrc(path: string): Promise<any> {
    return new Promise(async resolve => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(img.src);
      img.onerror = () => resolve('assets/placeholder.png');
    });
  }
  sortData() {
    console.log(this.sortBy);
    localStorage.setItem('sortBy', this.sortBy);
    let data = [];
    if (this.sortBy === 'DATE') {
      data = this.mockResponse.sort(this.compareByDate);
    }
    if (this.sortBy === 'NAME') {
      data = this.mockResponse.sort(this.compareByName);
    }
    this.mockResponse = data;
  }
  compareByDate(a, b) {
    const dateA = new Date(a.dateLastEdited);
    const dateB = new Date(b.dateLastEdited);
    let comparison = 0;
    if (dateA > dateB) {
    comparison = 1;
    } else if (dateA < dateB) {
    comparison = -1;
    }
    return comparison;
    }
    compareByName(a, b) {
      const dateA = a.name;
      const dateB = b.name;
      let comparison = 0;
      if (dateA > dateB) {
      comparison = 1;
      } else if (dateA < dateB) {
      comparison = -1;
      }
      return comparison;
      }
}
