import { EventEmitter, Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

/**
 * theme管理
 * 控制light和dark theme切换
 * 
 * Credit: https://indepth.dev/tutorials/angular/angular-material-theming-system-complete-guide
 */
@Injectable()
export class ThemeManagerService {
    // flase-light true-dark
    isDark = false;

    constructor(private storageService: StorageService) {
        this.storageService.changes.subscribe((change: {key: string;value: any;}) => {
            if(StorageService.themeModeKey === change.key) {
                this.isDark = Boolean(change.value);
            }
          })
    }

    /**
     * 切换模式
     */
    toggleDarkTheme() {
        if (this.isDark) {
            this.setLightMode();
            this.storageService.store(StorageService.themeModeKey, false);
        } else {
            this.setDarkMode();
            this.storageService.store(StorageService.themeModeKey, true);
        }
    }

    /**
     * 根据status决定加载何种模式
     * @param status false-表示加载Light mode true-表示加载dark mode
     */
    setTheme(status: boolean) {
        if(!status) {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
    }

    /**
     * 设置为light mode
     */
    private setLightMode() {
        this.removeStyle('dark-theme');
        document.body.classList.remove('dark-theme');
    }

    /**
     * 设置为dark mode
     */
    private setDarkMode() {
        const href = 'dark-theme.css';
        getLinkElementForKey('dark-theme').setAttribute('href', href);
        document.body.classList.add('dark-theme');
    }

    /**
     * 根据类名删除对应的元素
     * 
     * 即根据.dark-theme类删除对应的link标签
     * @param key 类名
     */
    removeStyle(key: string) {
        let existingLinkElement = getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }
}

/**
 * 获取拥有指定类名的link标签
 * 
 * @param key 类名
 * @returns link标签元素
 */
function getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(
        `link[rel="stylesheet"].${getClassNameForKey(key)}`
    );
}

function getClassNameForKey(key: string) {
    return `theme-manager-${key}`;
}

/**
 * 根据类名获取link标签元素，如果没有则创建一个
 * 
 * @param key 类名
 * @returns link标签元素
 */
function getLinkElementForKey(key: string) {
    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
}

