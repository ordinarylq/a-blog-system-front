import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, mergeMap } from 'rxjs';
import { FetchDataService } from 'src/app/common/service/fetch-data.service';
import { ArticleModel } from 'src/app/common/model/article.model';
import { HttpResponseInterface, PageInterface } from 'src/app/common/model/http-response.interface';
import { MarkdownConverterService } from 'src/app/common/service/markdown-convert.service';
import { LoadingService } from 'src/app/common/service/loading.service';
import { StorageService } from 'src/app/common/service/storage.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, AfterViewChecked {

    isLoadingResults = true;
    selectedArticleId!: number;
    articleItem?: ArticleModel;
    markedHtml!: SafeHtml;

    @ViewChild('htmlDocContent', { static: false })
    private htmlDocContent?: ElementRef<HTMLDivElement>;

    viewChecked = false;

    headerElements: Element[] = []; 

    constructor(private route: ActivatedRoute, private fetchDataService: FetchDataService,
        private markdownConverter: MarkdownConverterService, private loadingService: LoadingService, 
        private storageService: StorageService) { }

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

    ngAfterViewChecked(): void {
        if (!this.viewChecked && this.htmlDocContent) {
            
            // 获取该元素的所有h1-h2的直接子元素
            const elementArray = Array.from(this.htmlDocContent.nativeElement.children);
            let tableOfContents = elementArray.filter(
                (element: Element) => {
                    return element.nodeName.toLowerCase() === "h1" || element.nodeName.toLowerCase() === "h2";;
                }
            );
            // 使用setTimeout()避免ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                this.headerElements = tableOfContents;
                this.viewChecked = true;
            });
        }
    }

}
