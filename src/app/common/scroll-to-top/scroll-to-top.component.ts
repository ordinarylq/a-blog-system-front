import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Credit: https://www.techtrek.io/Adding-a-Scroll-to-Top-button-in-Angular/
 */
@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent {
  windowScrolled: boolean = false;

  // document代表了当前页面的DOM树对象
  // 通过DI的方式注入ducoment(document本身作为一个接口是无法被注入的)
  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll')
  onWindowScroll( ) {
    if(window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  /**
   * 递归式地调用直到scrollTo的第二个对象的值小于1，此时浏览器会自动划到顶端，
   * 因为默认像素取整数，小于1的时候认为不足一个像素。
   */
  scrollToTop() {
    (function smoothscroll() {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if(currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0,currentScroll - (currentScroll / 8));
      }
    })();
  }
}
