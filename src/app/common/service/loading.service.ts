import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class LoadingService {

    loadingEvent = new EventEmitter<boolean>();

    showLoading() {
        this.loadingEvent.emit(true);
    }

    hideLoading() {
        this.loadingEvent.emit(false);
    }

}