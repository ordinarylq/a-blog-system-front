import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {

    isLoadingResults = true;

    showLoading() {
        this.isLoadingResults = true;
    }

    hideLoading() {
        this.isLoadingResults = false;
    }

}