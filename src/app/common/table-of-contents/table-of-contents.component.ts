import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss']
})
export class TableOfContentsComponent {

  @Input()
  headerElements: Element[] = [];

  /**
   * 根据TOC滑动到指定的标题位置
   * 注意：需要排除掉顶部导航栏的高度
   * @param headerId 标题ID
   */
  navigateToHeader(headerId: string) {
    const headerElement = document.getElementById(headerId);
    const navBarHeight = (document.getElementsByTagName('app-nav-bar')[0].childNodes[0] as HTMLElement).offsetHeight;
    const scrollPosition = headerElement!.getBoundingClientRect().top + window.scrollY - navBarHeight;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
  }

}
