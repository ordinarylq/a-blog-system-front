export class CategoryModel {
    id: number;
    categoryName: string;
    routerPath: string;
    categoryOrder: number;

    constructor(id: number, categoryName: string, routerPath: string, categoryOrder: number) {
        this.id = id;
        this.categoryName = categoryName;
        this.routerPath = routerPath;
        this.categoryOrder = categoryOrder;
    }
}