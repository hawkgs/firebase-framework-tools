import { RendererFactory2, Signal } from '@angular/core';
import * as i0 from "@angular/core";
type LsThemeType = 'light' | 'dark';
export type ThemeType = LsThemeType | 'system';
/**
 * Provides an API for changing the UI theme
 * The initialization logic can be found in index.html
 */
export declare class ThemeService {
    private _doc;
    private _storage;
    private _renderer;
    private _current;
    constructor(rendererFactory: RendererFactory2);
    /**
     * Returns a read-only Signal with the current theme.
     *
     * @returns
     */
    getTheme(): Signal<ThemeType>;
    /**
     * Change current theme to light, dark or system one
     *
     * @param theme
     */
    setTheme(theme: ThemeType): void;
    /**
     * Initialize the current theme signal from the local storage, if null.
     */
    private _initSignal;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeService>;
}
export {};
