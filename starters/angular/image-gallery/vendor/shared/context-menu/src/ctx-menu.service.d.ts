import { Type } from '@angular/core';
import { CtxMenuController } from './ctx-menu.controller';
import { CtxMenu, CtxMenuConfig } from './types';
import * as i0 from "@angular/core";
export declare class CtxMenuService {
    private _menu;
    menu: import("@angular/core").Signal<CtxMenu<any, any> | null>;
    /**
     * Open a context menu.
     *
     * @param component The component representing the menu
     * @param event A mouse event with the absolute coordinates relative to the viewport
     * @param data Data passed to the menu
     */
    openMenu<D = void, R = void>(component: Type<unknown>, event: MouseEvent, data?: D, config?: Partial<CtxMenuConfig>): CtxMenuController<R>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CtxMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CtxMenuService>;
}
