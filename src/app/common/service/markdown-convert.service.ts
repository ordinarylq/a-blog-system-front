import { Injectable, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as showdown from "showdown";
import showdownHighlight from 'showdown-highlight';

/**
 * markdown转换为Html
 */
@Injectable()
export class MarkdownConverterService {

    converter: showdown.Converter;

    constructor(private sanitizer: DomSanitizer) {
        showdown.setFlavor('github');
        this.converter = new showdown.Converter({
            extensions: [showdownHighlight({
                pre: true, auto_detection: true
            })]
        });
    }
    
    parseToHtml(text: string) {
        return this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(text));
    }
}