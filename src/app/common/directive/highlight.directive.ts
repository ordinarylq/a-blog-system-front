import { AfterViewInit, Directive, ElementRef } from "@angular/core";
import hljs from 'highlight.js';

/**
 * 代码高亮
 */
@Directive({
    selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {
    constructor(private elementRef: ElementRef) {}
    ngAfterViewInit(): void {
        hljs.highlightAll();
    }

}