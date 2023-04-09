import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  static CATEGORY_URL = 'http://localhost:9898/api/categories?callback=myCallback';

  categories: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCategoryData().subscribe(
      (data: any) => {
        this.categories = data.data.slice();
      }
    )
  }

  fetchCategoryData(): Observable<any> {
    return this.http.get(NavBarComponent.CATEGORY_URL,
      {
        headers: new HttpHeaders({ 'X-API-VERSION': '1' }),
        observe: 'body',
        responseType: 'json'
      }).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
