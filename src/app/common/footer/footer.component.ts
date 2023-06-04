import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeManagerService } from '../service/theme-manager.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  isDark = false;

  constructor(private storageService: StorageService) {
    this.storageService.changes.subscribe((change: {key: string;value: any;}) => {
      if(StorageService.themeModeKey === change.key) {
          this.isDark = Boolean(change.value);
      }
    })
  }
  ngOnInit(): void {
    if(this.storageService.select(StorageService.themeModeKey)) {
      this.isDark = Boolean(this.storageService.select(StorageService.themeModeKey));
    }
  }

  ngOnDestroy(): void {}
}
