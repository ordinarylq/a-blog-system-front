import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, mergeMap } from 'rxjs';
import { FetchDataService } from 'src/app/common/fetch-data.service';
import { ArticleModel } from 'src/app/common/model/article.model';
import { HttpResponseInterface, PageInterface } from 'src/app/common/model/http-response.interface';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

    isLoadingResults = true;
    selectedArticleId!: number;
    articleItem?: ArticleModel;

    constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService) { }

    ngOnInit(): void {
        this.isLoadingResults = true;
        this.route.params
            .pipe(
                tap((param: any) => this.selectedArticleId = param.articleId),
                mergeMap((param: any) => this.fetchDataService.getArticleItemById(param.articleId))
            )
            .subscribe((response: HttpResponseInterface) => {
                this.articleItem = response.data[0] as ArticleModel;
                this.isLoadingResults = false;
            });
    }



}
