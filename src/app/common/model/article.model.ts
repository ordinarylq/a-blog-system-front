export class ArticleModel {
    id: number;
    title: string;
    subtitle: string;
    userId: number;
    categoryId: number;
    content: string;
    createTime: string;
    updateTime: string;

    constructor(
        id: number, title: string, subtitle: string, userId: number, categoryId: number,
        content: string, createTime: string, updateTime: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.userId = userId;
        this.categoryId = categoryId;
        this.content = content;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
} 