import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  static CATEGORY_URL = 'http://localhost:9898/api/categories';

  categories: any[] = [];

  constructor(private http: HttpClient, private fetchDataService: FetchDataService) { }

  ngOnInit(): void {
    this.fetchDataService.getCategoryData().subscribe((data: any) => {
      this.categories = data.data.slice();
    })
  }
}
