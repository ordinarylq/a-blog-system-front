import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from './common/footer/footer.component';
import { ArticleComponent } from './content/article/article.component';
import { ArticleListComponent } from './content/article/article-list/article-list.component';
import { ArticleDetailComponent } from './content/article/article-detail/article-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentComponent } from './content/content.component';
import { IndexComponent } from './content/index/index.component';
import { FetchDataService } from './common/service/fetch-data.service';
import { MarkdownConverterService } from './common/service/markdown-convert.service';
import { HighlightDirective } from './common/directive/highlight.directive';
import { LoadingService } from './common/service/loading.service';
import { ThemeManagerService } from './common/service/theme-manager.service';
import { StorageService } from './common/service/storage.service';
import { Observable } from 'rxjs';
import { ScrollToTopComponent } from './common/scroll-to-top/scroll-to-top.component';
import { TableOfContentsComponent } from './common/table-of-contents/table-of-contents.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ArticleComponent,
    ArticleListComponent,
    ArticleDetailComponent,
    ContentComponent,
    IndexComponent,
    ScrollToTopComponent,
    TableOfContentsComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    
  ],
  providers: [FetchDataService, MarkdownConverterService, LoadingService, ThemeManagerService, StorageService, 
    {
      provide: APP_INITIALIZER,
      useFactory: loadTheme,
      deps: [ThemeManagerService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ 
  
}

// 根据isDark情况决定当前要加载的模式
function loadTheme(themeManager: ThemeManagerService): () => Observable<void> {
  return () => themeManager.setStoragedTheme();
}
