import { Component } from '@angular/core';
import { LoadingService } from 'src/app/common/service/loading.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  constructor(private loadingService: LoadingService) {}

  checkIfLoading() {
    return this.loadingService.isLoadingResults;
  }

}
