import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/common/service/loading.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  isLoading!: boolean;

  constructor(private loadingService: LoadingService) { 
    this.loadingService.loadingEvent.subscribe((data) => {
      console.log('结果：' + data);
      this.isLoading = data;
    });
  }
  ngOnInit(): void {
    
  }

}
