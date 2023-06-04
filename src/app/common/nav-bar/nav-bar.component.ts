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
    if(this.storageService.select(StorageService.themeModeKey)) {
      this.isDark = JSON.parse(this.storageService.select(StorageService.themeModeKey)!);
    }
    
    this.fetchDataService.getCategoryData().subscribe((data: HttpResponseInterface) => {
      this.categories = data.data.slice();
    })
  }

  selectedNoneCategory() {
    this.storageService.store(StorageService.selectedCategoryKey, -1);
  }

  toggleDarkTheme() {
    this.themeManager.toggleDarkTheme();
  }
}
