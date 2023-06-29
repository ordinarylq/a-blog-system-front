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

        // 给h1, h2添加a标签及icon
        const addLinkToHeaderExtension: any[] = [{
            type: 'output',
            filter: function(text: string, converter: showdown.Converter, options: showdown.ShowdownOptions) {
                text = text.replace(/<h([12])[^>]*>(.*?)<\/h\1>/gi, (match, level, content) => {
                    const headerId = content.replace(/<\/?[^>]+(>|$)>/g, '').replace(/\s/g, '-');
                    return `<h${level} id="${headerId}"><a title="Link to this heading" class="header-link" href="./"><i class="material-icons">link</i></a>${content}</h${level}>`;
                })
                return text;
            }
        }]
        this.converter.addExtension(addLinkToHeaderExtension);
    }
    
    parseToHtml(text: string) {
        return this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(text));
    }
}