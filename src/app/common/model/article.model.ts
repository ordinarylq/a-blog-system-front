import { CategoryModel } from "./category.model";

export class ArticleModel {
    id: number;
    title: string;
    subtitle: string;
    userId: number;
    category: CategoryModel;
    content: string;
    createTime: string;
    updateTime: string;

    constructor(
        id: number, title: string, subtitle: string, userId: number, category: CategoryModel,
        content: string, createTime: string, updateTime: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.userId = userId;
        this.category = category;
        this.content = content;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
} 