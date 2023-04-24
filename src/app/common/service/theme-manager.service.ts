import { Injectable } from "@angular/core";


/**
 * 控制light和dark theme切换
 * 
 * Credit: https://indepth.dev/tutorials/angular/angular-material-theming-system-complete-guide
 */
@Injectable()
export class ThemeManagerService {
    // 初始默认为light theme
    isDark = false;

    toggleDarkTheme() {
        if (this.isDark) {
            this.removeStyle('dark-theme');
            document.body.classList.remove('dark-theme');
            this.isDark = false;
        } else {
            const href = 'dark-theme.css';
            getLinkElementForKey('dark-theme').setAttribute('href', href);
            document.body.classList.add('dark-theme');
            this.isDark = true;
        }
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

