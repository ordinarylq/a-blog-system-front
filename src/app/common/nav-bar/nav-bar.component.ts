import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchDataService } from '../service/fetch-data.service';
import { HttpResponseInterface } from '../model/http-response.interface';
import { ThemeManagerService } from '../service/theme-manager.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  categories: any[] = [];

  selectedStatus: boolean[] = [];

  selectedCategoryIndex: number = -1;

  isDark = false;

  constructor(
    private fetchDataService: FetchDataService,
    private themeManager: ThemeManagerService,
    private storageService: StorageService
  ) { 
    this.storageService.changes.subscribe((change: {key: string;value: any;}) => {
      if(StorageService.selectedCategoryKey === change.key) {
        this.selectedCategoryIndex = Number(change.value);
      } else if(StorageService.themeModeKey === change.key) {
        this.isDark = Boolean(change.value);
      }
    });
  }

  ngOnInit(): void {
    this.fetchDataService.getCategoryData().subscribe((data: HttpResponseInterface) => {
      this.categories = data.data.slice();
    })
    if(this.storageService.select(StorageService.themeModeKey)) {
      this.isDark = Boolean(this.storageService.select(StorageService.themeModeKey));
    }
    // 根据isDark情况决定当前要加载的模式
    this.themeManager.setTheme(this.isDark);
  }

  toggleDarkTheme() {
    this.themeManager.toggleDarkTheme();
  }
}
