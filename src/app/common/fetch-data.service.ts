import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { HttpResponseInterface } from "./model/http-response.interface";

/**
 * 调用后端接口获取数据
 */
@Injectable()
export class FetchDataService {
    static BASE_URL = 'http://localhost:9898/';

    static CATEGORY_URL = FetchDataService.BASE_URL + 'api/categories';

    static ARTICLE_LIST_URL = FetchDataService.BASE_URL + 'api/articles'

    constructor(private http: HttpClient) { }

    /**
     * 获取所有文章类型
     * @returns 文章类别Observable
     */
    getCategoryData(): Observable<HttpResponseInterface> {
        return this.http.get<HttpResponseInterface>(
            FetchDataService.CATEGORY_URL,
            {
                headers: new HttpHeaders({ 'X-API-VERSION': '1' }),
                observe: 'body',
                responseType: 'json'
            }).pipe(retry(3), catchError(this.handleError));
    }

    /**
     * 根据类型获取所有文章
     * @param id 类型编号
     * @param pageNum 页码，默认为第一页
     * @param pageSize 页面大小，默认20条
     * @returns 文章信息列表Observable
     */
    getArticleListByCategory(id: number, pageNum = 1, pageSize = 20): Observable<HttpResponseInterface> {
        return this.http.get<HttpResponseInterface>(
            FetchDataService.ARTICLE_LIST_URL + '/' + id + '/' + pageNum + '/' + pageSize,
            {
                headers: new HttpHeaders({ 'X-API-VERSION': '1' }),
                observe: 'body',
                responseType: 'json'
            }).pipe(retry(3), catchError(this.handleError));
    }

    /**
     * 处理请求接口出现的错误
     * @param error 错误响应
     * @returns 
     */
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