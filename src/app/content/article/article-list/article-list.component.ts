import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectConfig, Observable, ReplaySubject, mergeMap, tap } from 'rxjs';
import { FetchDataService } from 'src/app/common/fetch-data.service';
import { ArticleModel } from 'src/app/common/model/article.model';
import { HttpResponseInterface, PageInterface } from 'src/app/common/model/http-response.interface';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  private selectedCategoryId!: number;

  // articleList!: ArticleModel[];
  dataSource!: MyDataSource;

  displayedColumns = ['title', 'subtitle', 'author', 'createTime', 'updateTime'];

  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((param: any) => this.selectedCategoryId = param.categoryId),
        mergeMap((param: any) => this.fetchDataService.getArticleListByCategory(param.categoryId, 1, 20))
      )
      .subscribe((response: HttpResponseInterface) => { this.dataSource = new MyDataSource((response.data[0] as PageInterface).records.slice()) });
  }

  onToArticleDetail(articleId: number) {
    // todo 跳转到文章详情
  }
}

class MyDataSource extends DataSource<ArticleModel> {
  private _dataStream = new ReplaySubject<ArticleModel[]>();

  constructor(initialData: ArticleModel[]) {
    super();
    this.setData(initialData);
  }

  setData(data: ArticleModel[]) {
    this._dataStream.next(data);
  }

  connect(): Observable<ArticleModel[]> {
    return this._dataStream;
  }

  disconnect() {

  }
  
}
