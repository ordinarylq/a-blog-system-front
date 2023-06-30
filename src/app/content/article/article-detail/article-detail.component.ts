import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ArticleDetailComponent implements OnInit {

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
        private storageService: StorageService, private renderer: Renderer2, private elementRef: ElementRef, private router: Router) { }

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

                // 使用setTimeout()避免ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    if(this.htmlDocContent) {
                        const elementArray = Array.from(this.htmlDocContent.nativeElement.children);
                        let tableOfContents = elementArray.filter(
                            (element: Element) => {
                                return element.nodeName.toLowerCase() === "h1" || element.nodeName.toLowerCase() === "h2";
                            }
                        );
                        this.headerElements = tableOfContents;
                        // 设置h1,h2内部a标签的href属性
                        for (let element of tableOfContents) {
                            let currentUrl = this.router.url;
                            const index = currentUrl.indexOf('#');
                            currentUrl = index !== -1 ? currentUrl.substring(0, index) : currentUrl;
                            const urlProperty = `${currentUrl}#${element.id}`; 
                            this.renderer.setProperty(element.childNodes[0], 'href', urlProperty);
                        }
                    }
                    // 给header-link的父标签h1,h2设置点击事件
                    const elements = this.elementRef.nativeElement.querySelectorAll('.header-link');
                    elements.forEach((element: Element) => {
                        this.renderer.listen(element, 'click', () => {
                            this.onHeaderLinkClick(element);
                        })
                    });
                })
            });
    }

    /**
     * 页面内滑动到header元素处
     * @param element header元素的anchor子元素
     */
    onHeaderLinkClick(element: Element) {
        const navBarHeight = (document.getElementsByTagName('app-nav-bar')[0].childNodes[0] as HTMLElement).offsetHeight;
        const scrollPosition = element.parentElement!.getBoundingClientRect().top + window.scrollY - navBarHeight;
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        })
    }

}
