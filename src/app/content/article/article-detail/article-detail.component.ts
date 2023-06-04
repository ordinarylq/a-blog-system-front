import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, mergeMap } from 'rxjs';
import { FetchDataService } from 'src/app/common/service/fetch-data.service';
import { ArticleModel } from 'src/app/common/model/article.model';
import { HttpResponseInterface, PageInterface } from 'src/app/common/model/http-response.interface';
import { MarkdownConverterService } from 'src/app/common/service/markdown-convert.service';
import { LoadingService } from 'src/app/common/service/loading.service';
import { StorageService } from 'src/app/common/service/storage.service';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

    isLoadingResults = true;
    selectedArticleId!: number;
    articleItem?: ArticleModel;
    markedHtml!: string;

    constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService,
        private markdownConverter: MarkdownConverterService, private loadingService: LoadingService, private storageService: StorageService) { }

    ngOnInit(): void {
        this.loadingService.showLoading();
        this.route.params
            .pipe(
                tap((param: any) => this.selectedArticleId = param.articleId),
                mergeMap((param: any) => this.fetchDataService.getArticleItemById(param.articleId))
            )
            .subscribe((response: HttpResponseInterface) => {
                this.articleItem = response.data[0] as ArticleModel;
                this.markedHtml = this.markdownConverter.parseToHtml(this.articleItem.content);
                this.storageService.store(StorageService.selectedCategoryKey, this.articleItem.category.id);
                this.loadingService.hideLoading();
            });
    }



}
