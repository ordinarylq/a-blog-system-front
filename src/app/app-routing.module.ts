import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './content/index/index.component';
import { ArticleComponent } from './content/article/article.component';
import { ArticleListComponent } from './content/article/article-list/article-list.component';
import { ArticleDetailComponent } from './content/article/article-detail/article-detail.component';

// 路由词典
const routes: Routes = [
  { path: '', title: 'Index Page', component: IndexComponent },
  {
    path: 'article', component: ArticleComponent,
    children: [
      {path: 'list/:categoryId', component: ArticleListComponent},
      {path: 'detail', component: ArticleDetailComponent},
    ]
  },
  // todo PageNotFoundComponent, SystemInternalErrorComponent?
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
