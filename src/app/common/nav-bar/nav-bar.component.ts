import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../service/fetch-data.service';
import { HttpResponseInterface } from '../model/http-response.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  categories: any[] = [];

  constructor(private fetchDataService: FetchDataService) { }

  ngOnInit(): void {
    this.fetchDataService.getCategoryData().subscribe((data: HttpResponseInterface) => {
      this.categories = data.data.slice();
    })
  }
}
