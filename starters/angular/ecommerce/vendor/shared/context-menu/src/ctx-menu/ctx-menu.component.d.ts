import { AfterViewInit, ElementRef, InjectionToken, ViewContainerRef } from '@angular/core';
import { CtxMenu } from '../types';
import * as i0 from "@angular/core";
export declare const CTX_MENU_DATA: InjectionToken<unknown>;
export declare class CtxMenuComponent<D, R> implements AfterViewInit {
    private _win;
    menu: import("@angular/core").InputSignal<CtxMenu<D, R>>;
    container: import("@angular/core").Signal<ElementRef<any>>;
    content: import("@angular/core").Signal<ViewContainerRef>;
    posOffset: import("@angular/core").WritableSignal<{
        x: number;
        y: number;
    }>;
    translate: import("@angular/core").Signal<string>;
    ngAfterViewInit(): void;
    onDocumentMousedown(): void;
    private _createInjector;
    private _calculatePositionOffset;
    static ɵfac: i0.ɵɵFactoryDeclaration<CtxMenuComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CtxMenuComponent<any, any>, "ngx-ctx-menu", never, { "menu": { "alias": "menu"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
