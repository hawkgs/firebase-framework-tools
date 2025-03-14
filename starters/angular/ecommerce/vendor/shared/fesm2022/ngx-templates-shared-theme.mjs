import * as i0 from '@angular/core';
import { inject, signal, Injectable, Pipe, input, ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@ngx-templates/shared/icon';
import { DOCUMENT } from '@angular/common';
import { LocalStorage } from '@ngx-templates/shared/services';

const THEME_LS_KEY = 'ngx-theme';
const getThemeClass = (t) => `ngx-${t}-theme`;
/**
 * Provides an API for changing the UI theme
 * The initialization logic can be found in index.html
 */
class ThemeService {
    _doc = inject(DOCUMENT);
    _storage = inject(LocalStorage);
    _renderer;
    _current = signal(null);
    constructor(rendererFactory) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }
    /**
     * Returns a read-only Signal with the current theme.
     *
     * @returns
     */
    getTheme() {
        this._initSignal();
        return this._current.asReadonly();
    }
    /**
     * Change current theme to light, dark or system one
     *
     * @param theme
     */
    setTheme(theme) {
        this._initSignal();
        const doc = this._doc.documentElement;
        if (this._current() !== 'system') {
            this._renderer.removeClass(doc, getThemeClass(this._current()));
            this._storage.remove(THEME_LS_KEY);
        }
        if (theme !== 'system') {
            this._renderer.addClass(doc, getThemeClass(theme));
            this._storage.set(THEME_LS_KEY, theme);
        }
        this._current.set(theme);
    }
    /**
     * Initialize the current theme signal from the local storage, if null.
     */
    _initSignal() {
        if (!this._current()) {
            const current = this._storage.get(THEME_LS_KEY);
            this._current.set(current ? current : 'system');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ThemeService, deps: [{ token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ThemeService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i0.RendererFactory2 }] });

const THEME_TO_LABEL = {
    ['system']: 'System',
    ['light']: 'Light',
    ['dark']: 'Dark',
};
class ThemeLabelPipe {
    transform(value) {
        return THEME_TO_LABEL[value];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ThemeLabelPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.2", ngImport: i0, type: ThemeLabelPipe, isStandalone: true, name: "themeLabel" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ThemeLabelPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'themeLabel',
                }]
        }] });

const THEME_SEQ = ['system', 'light', 'dark'];
const THEME_TO_ICON = {
    ['system']: 'Routine',
    ['light']: 'LightMode',
    ['dark']: 'DarkMode',
};
class ThemeSwitchComponent {
    _theme = inject(ThemeService);
    currentTheme = this._theme.getTheme();
    iconOnly = input(false);
    THEME_TO_ICON = THEME_TO_ICON;
    onThemeSwitch() {
        const currentIdx = THEME_SEQ.findIndex((t) => t === this.currentTheme());
        const newIdx = (currentIdx + 1) % THEME_SEQ.length;
        this._theme.setTheme(THEME_SEQ[newIdx]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ThemeSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: ThemeSwitchComponent, isStandalone: true, selector: "ngx-theme-switch", inputs: { iconOnly: { classPropertyName: "iconOnly", publicName: "iconOnly", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<button\n  (click)=\"onThemeSwitch()\"\n  [title]=\"\n    !iconOnly() ? 'Change the current theme' : (currentTheme() | themeLabel)\n  \"\n>\n  @if (!iconOnly()) {\n    <span>{{ currentTheme() | themeLabel }}</span>\n  }\n  <ngx-icon [name]=\"THEME_TO_ICON[currentTheme()]\" size=\"xlg\" />\n</button>\n", styles: [":host button{text-transform:uppercase;font-size:.625rem;letter-spacing:.125rem}:host{display:block}:host button{display:flex;align-items:center;justify-content:flex-end;width:auto;height:auto;border:none;background:transparent;padding:0;color:var(--color-quaternary);transition:color .3s ease;cursor:pointer}:host button span{margin-right:.25rem;width:0;overflow:hidden;transition:width .2s ease}:host button:hover>span{width:100%}:host button:hover{color:var(--color-primary)}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "ngx-icon", inputs: ["name", "size"] }, { kind: "pipe", type: ThemeLabelPipe, name: "themeLabel" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ThemeSwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-theme-switch', imports: [IconComponent, ThemeLabelPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  (click)=\"onThemeSwitch()\"\n  [title]=\"\n    !iconOnly() ? 'Change the current theme' : (currentTheme() | themeLabel)\n  \"\n>\n  @if (!iconOnly()) {\n    <span>{{ currentTheme() | themeLabel }}</span>\n  }\n  <ngx-icon [name]=\"THEME_TO_ICON[currentTheme()]\" size=\"xlg\" />\n</button>\n", styles: [":host button{text-transform:uppercase;font-size:.625rem;letter-spacing:.125rem}:host{display:block}:host button{display:flex;align-items:center;justify-content:flex-end;width:auto;height:auto;border:none;background:transparent;padding:0;color:var(--color-quaternary);transition:color .3s ease;cursor:pointer}:host button span{margin-right:.25rem;width:0;overflow:hidden;transition:width .2s ease}:host button:hover>span{width:100%}:host button:hover{color:var(--color-primary)}\n"] }]
        }] });

const THEME_COMPONENTS = [ThemeSwitchComponent];

/**
 * Generated bundle index. Do not edit.
 */

export { THEME_COMPONENTS, ThemeService, ThemeSwitchComponent };
//# sourceMappingURL=ngx-templates-shared-theme.mjs.map
