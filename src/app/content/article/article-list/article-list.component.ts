import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs';
import { FetchDataService } from 'src/app/common/fetch-data.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  private selectedCategoryId!: number;

  articleList!: [];

  constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((param: any) => this.selectedCategoryId = param.categoryId),
        mergeMap((param: any) => this.fetchDataService.getArticleListByCategory(param.categoryId, 1, 20))
      )
      .subscribe((data: any) => {this.articleList = data.data.slice()});
  }

}
