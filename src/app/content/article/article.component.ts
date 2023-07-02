import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/common/service/loading.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  isLoading!: boolean;

  constructor(private loadingService: LoadingService, private cdr: ChangeDetectorRef) { 
    
  }
  ngOnInit(): void {
    this.loadingService.loadingEvent.subscribe((data) => {
      this.isLoading = data;
      this.cdr.detectChanges();
    });
  }

}
