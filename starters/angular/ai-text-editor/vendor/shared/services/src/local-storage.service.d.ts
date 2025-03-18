import * as i0 from "@angular/core";
/**
 * localStorage wrapper. Browser-only.
 * Should not be used during the server-side
 * rendering phase (no use case).
 */
export declare class LocalStorage {
    private _platformId;
    private get _isBrowser();
    get(key: string): string | null;
    getJSON(key: string): object | null;
    set(key: string, data: string): void;
    setJSON(key: string, data: object): void;
    remove(key: string): void;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorage, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorage>;
}
