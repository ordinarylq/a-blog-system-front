import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingService } from 'src/app/common/service/loading.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  isLoading!: boolean;

  constructor(private loadingService: LoadingService) {}

  checkIfLoading() {
    this.isLoading = this.loadingService.isLoadingResults;
  }

}
