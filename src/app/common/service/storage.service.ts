import { Injectable, OnDestroy } from "@angular/core";
import { Subject, share } from "rxjs";
/**
 * 操作Storage
 * 
 * Credit: https://stackoverflow.com/a/47683091
 */
@Injectable()
export class StorageService implements OnDestroy {

    static selectedCategoryKey = '__selected__category__Index__';

    static themeModeKey = '__selected__theme__mode__';

    private onSubject = new Subject<{key: string, value: any}>();
    public changes = this.onSubject.asObservable().pipe(share());

    constructor() {
        this.start();
    }

    ngOnDestroy() {
        this.stop();
    }

    /**
     * 获取Storage中的所有key-value pair对
     * @returns key-value对数组
     */
    public getStorage() {
        let s = [];
        for(let i = 0; i < localStorage.length; i++) {
            s.push({
                key: localStorage.key(i),
                value: JSON.parse(localStorage.getItem(localStorage.key(i)!)!)
            })
        }
        return s;
    }

    /**
     * 存储key-value pair对到Storage中
     * @param key 键
     * @param data 值
     */
    public store(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
        this.onSubject.next({key: key, value: data});
    }

    /**
     * 获取指定key对应的值
     * @param key 键
     */
    public select(key: string) {
        return localStorage.getItem(key);
    }

    /**
     * 清除Storage中指定键的值
     * @param key 键
     */
    public clear(key: string) {
        localStorage.removeItem(key);
        this.onSubject.next({key: key, value: null});
    }
    
    private start() {
        window.addEventListener('storage', this.storageEventListener.bind(this));
    }

    private stop() {
        window.removeEventListener('storage', this.storageEventListener.bind(this));
        this.onSubject.complete();
    }

    private storageEventListener(event: StorageEvent) {
        if(event.storageArea == localStorage) {
            let v;
            try {
                v = JSON.parse(event.newValue!);
            } catch (error) {
                v = event.newValue;
            }
            this.onSubject.next({key: event.key!, value: v});
        }
    }


}