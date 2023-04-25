import { Component, OnDestroy } from '@angular/core';
import { ThemeManagerService } from '../service/theme-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {

  isDark = this.themeManager.isDark;

  constructor(private themeManager: ThemeManagerService) {
    this.themeManager.isDarkChange.subscribe(value => {
      this.isDark = value;
    })
  }

  ngOnDestroy(): void {
    this.themeManager.isDarkChange.unsubscribe();
  }
}
