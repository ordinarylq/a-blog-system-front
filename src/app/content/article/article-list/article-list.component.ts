import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';
import { FetchDataService } from 'src/app/common/fetch-data.service';
import { HttpResponseInterface, PageInterface } from 'src/app/common/model/http-response.interface';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  selectedCategoryId!: number;
  displayedColumns = ['title', 'subtitle', 'author', 'createTime', 'updateTime'];

  pageItem!: PageInterface;
  resultsLength = 50;
  isLoadingResults = true;
  pageNum = 1;
  pageSize = 20;
  pageSizeOptions = [5, 10, 20];
  showTable = false;

  constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService, private router: Router) { }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.route.params
      .pipe(
        tap((param: any) => this.selectedCategoryId = param.categoryId),
        mergeMap((param: any) => this.fetchDataService.getArticleListByCategory(param.categoryId, this.pageNum, this.pageSize))
      )
      .subscribe((response: HttpResponseInterface) => {
        this.pageItem = response.data[0] as PageInterface;
        this.resultsLength = this.pageItem.total;
        this.pageNum = this.pageItem.current;
        this.pageSize = this.pageItem.size;

        this.isLoadingResults = false;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.isLoadingResults = true;
    this.fetchDataService.getArticleListByCategory(this.selectedCategoryId, e.pageIndex + 1, e.pageSize).subscribe(
      (response: HttpResponseInterface) => {
        this.pageItem = response.data[0] as PageInterface;
        this.resultsLength = this.pageItem.total;
        this.pageNum = this.pageItem.current;
        this.pageSize = this.pageItem.size;

        this.isLoadingResults = false;
      }
    );
  }

  onToArticleDetail(articleId: number) {
    this.router.navigateByUrl('/article/detail/' + articleId);
  }
}
