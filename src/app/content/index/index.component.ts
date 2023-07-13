import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/common/service/storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger('zoomIn', [
      state('void', style({ transform: 'scale(0)' })),
      transition(':enter', animate('0.5s', style({ transform: 'scale(1)' })))
    ]),
  ]
})
export class IndexComponent implements OnInit {

  myProfile: string[] = [];
  techWithInterests: string[] = [];

  isDark = false;

  constructor(private storageService: StorageService) {
    this.storageService.changes.subscribe((change: {key: string;value: any;}) => {
      if(StorageService.themeModeKey === change.key) {
          this.isDark = Boolean(change.value);
      }
    });
  }

  ngOnInit(): void {
    if(this.storageService.select(StorageService.themeModeKey)) {
      this.isDark = JSON.parse(this.storageService.select(StorageService.themeModeKey)!);
    }
    this.myProfile = [
      'Java后端开发', '前端小白','努力修炼中...'
    ];
    this.techWithInterests = [
      'Spring Framework', 'JVM', 'Linux', 'MySQL & Oracle Database', 'Angular', '...'
    ];
  }

  /**
   * 随机从数组中取若干个值
   * 
   * @param arr 源数组
   * @param count 待取值个数
   * @returns 目标值组成的数组
   */
  private getRandomArrayElements(arr: string[], count: number) {
    let myArray = arr.slice();
    let i = myArray.length;
    let startIndex = i - count;
    while(i > startIndex) {
      i--;
      let randomNum = Math.floor((i + 1) * Math.random());
      let temp = myArray[randomNum];
      myArray[randomNum] = myArray[i];
      myArray[i] = temp;
    }
    return myArray.slice(startIndex);
  }

}
