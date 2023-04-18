import { Injectable, OnInit } from "@angular/core";
import * as showdown from "showdown";

/**
 * markdown转换为Html
 */
@Injectable()
export class MarkdownConverterService {

    
    converter: showdown.Converter;
    constructor() {
        showdown.setFlavor('github');
        this.converter = new showdown.Converter();
    }
    parseToHtml(text: string) {
        return this.converter.makeHtml(text);
    }
}