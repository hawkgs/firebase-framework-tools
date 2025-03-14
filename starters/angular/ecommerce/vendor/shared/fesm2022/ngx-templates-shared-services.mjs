import { isPlatformBrowser } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, PLATFORM_ID, Injectable, InjectionToken } from '@angular/core';

/**
 * localStorage wrapper. Browser-only.
 * Should not be used during the server-side
 * rendering phase (no use case).
 */
class LocalStorage {
    _platformId = inject(PLATFORM_ID);
    get _isBrowser() {
        return isPlatformBrowser(this._platformId);
    }
    get(key) {
        if (!this._isBrowser) {
            return null;
        }
        return localStorage.getItem(key);
    }
    getJSON(key) {
        if (!this._isBrowser) {
            return null;
        }
        const item = this.get(key);
        try {
            return JSON.parse(item || '');
        }
        catch {
            return null;
        }
    }
    set(key, data) {
        if (!this._isBrowser) {
            return;
        }
        localStorage.setItem(key, data);
    }
    setJSON(key, data) {
        if (!this._isBrowser) {
            return;
        }
        localStorage.setItem(key, JSON.stringify(data));
    }
    remove(key) {
        if (!this._isBrowser) {
            return;
        }
        localStorage.removeItem(key);
    }
    clear() {
        if (!this._isBrowser) {
            return;
        }
        localStorage.clear();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: LocalStorage, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: LocalStorage, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: LocalStorage, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const WINDOW = new InjectionToken('WINDOW');
const provideWindow = () => ({
    provide: WINDOW,
    useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        return isPlatformBrowser(platformId) ? window : {};
    },
});

/**
 * Generated bundle index. Do not edit.
 */

export { LocalStorage, WINDOW, provideWindow };
//# sourceMappingURL=ngx-templates-shared-services.mjs.map
