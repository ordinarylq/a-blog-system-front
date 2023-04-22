import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from './common/footer/footer.component';
import { ArticleComponent } from './content/article/article.component';
import { ArticleListComponent } from './content/article/article-list/article-list.component';
import { ArticleItemComponent } from './content/article/article-list/article-item/article-item.component';
import { ArticleDetailComponent } from './content/article/article-detail/article-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentComponent } from './content/content.component';
import { IndexComponent } from './content/index/index.component';
import { FetchDataService } from './common/service/fetch-data.service';
import { MarkdownConverterService } from './common/service/markdown-convert.service';
import { HighlightDirective } from './common/directive/highlight.directive';
import { LoadingService } from './common/service/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ArticleComponent,
    ArticleListComponent,
    ArticleItemComponent,
    ArticleDetailComponent,
    ContentComponent,
    IndexComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    
  ],
  providers: [FetchDataService, MarkdownConverterService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule{ 
  
}
