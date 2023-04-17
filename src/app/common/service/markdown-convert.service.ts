import { Injectable } from "@angular/core";
import * as showdown from "showdown";

/**
 * markdown转换为Html
 */
@Injectable()
export class MarkdownConverterService {
    converter = new showdown.Converter();
    parseToHtml(text: string) {
        this.converter.setFlavor('github');
        return this.converter.makeHtml(text);
    }
}