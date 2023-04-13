import { ArticleModel } from "./article.model";
import { CategoryModel } from "./category.model";

export interface HttpResponseInterface {
    status: number;
    errorCode: string;
    errorMessage: string;
    userMessage: string;
    data: CategoryModel[] | PageInterface[]
}

export interface PageInterface {
    records: ArticleModel[];
    total: number;
    size: number;
    current: number;
    pages: number;
}