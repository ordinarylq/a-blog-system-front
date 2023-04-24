import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../service/fetch-data.service';
import { HttpResponseInterface } from '../model/http-response.interface';
import { ThemeManagerService } from '../service/theme-manager.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  categories: any[] = [];

  selectedStatus: boolean[] = [];

  isDark = this.themeManager.isDark;

  constructor(
    private fetchDataService: FetchDataService,
    private themeManager: ThemeManagerService
  ) { }

  ngOnInit(): void {
    this.fetchDataService.getCategoryData().subscribe((data: HttpResponseInterface) => {
      this.categories = data.data.slice();
      this.selectedStatus = new Array(this.categories.length).fill(false);

      // 如果用户直接修改浏览器url, 需要根据类型id给指定导航按钮设置为selected
      let currentUrl = window.location.href;
      let categoryId: number = Number(currentUrl.slice(currentUrl.lastIndexOf('/') + 1, currentUrl.length));
      console.log(categoryId);
      if (categoryId > 0 && categoryId <= this.categories.length) {
        this.selectedStatus[categoryId - 1] = true;
      }

    })
  }

  toggleDarkTheme() {
    this.themeManager.toggleDarkTheme();
    this.isDark = !this.isDark;
  }

  setSelectedClass(index: number) {
    this.selectedStatus = new Array(this.categories.length).fill(false);
    if (index >= 0) {
      this.selectedStatus[index] = true;
    }
  }
}
