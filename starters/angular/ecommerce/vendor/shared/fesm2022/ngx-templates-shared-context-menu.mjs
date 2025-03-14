import * as i0 from '@angular/core';
import { InjectionToken, inject, input, viewChild, ViewContainerRef, signal, computed, Injector, HostListener, ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { WINDOW, provideWindow } from '@ngx-templates/shared/services';

class CtxMenuController {
    constructor(_menu) {
        this._menu = _menu;
        /**
         * A `Promise` that is resolved when the target modal is closed.
         */
        this.closed = new Promise((res) => {
            this._resolver = res;
        });
    }
    /**
     * Close the target modal.
     *
     * @param result Provided response data
     */
    close(result) {
        this._menu.set(null);
        this._resolver(result);
    }
}

const COOR_MARGIN = 15; // px
const CTX_MENU_DATA = new InjectionToken('CTX_MENU_DATA');
class CtxMenuComponent {
    constructor() {
        this._win = inject(WINDOW);
        this.menu = input.required();
        this.container = viewChild.required('container');
        this.content = viewChild.required('content', { read: ViewContainerRef });
        this.posOffset = signal({ x: 0, y: 0 });
        // Position of the menu
        this.translate = computed(() => {
            const scrollX = this._win.scrollX;
            const scrollY = this._win.scrollY;
            let { x, y } = this.menu().coor;
            x += scrollX + COOR_MARGIN + this.posOffset().x;
            y += scrollY + COOR_MARGIN + this.posOffset().y;
            return `translate(${x}px, ${y}px)`;
        });
    }
    ngAfterViewInit() {
        const menu = this.menu();
        const injector = this._createInjector(menu);
        this.content().createComponent(menu.component, { injector });
        this._calculatePositionOffset();
    }
    onDocumentMousedown() {
        this.menu()?.controller.close();
    }
    _createInjector(ctxMenu) {
        const providers = [
            {
                provide: CTX_MENU_DATA,
                useValue: ctxMenu.data,
            },
            {
                provide: CtxMenuController,
                useValue: ctxMenu.controller,
            },
        ];
        return Injector.create({
            providers,
            parent: ctxMenu.config.injector,
        });
    }
    _calculatePositionOffset() {
        const { width, height } = this.container().nativeElement.getBoundingClientRect();
        const { x, y } = this.menu().coor;
        const offset = { x: 0, y: 0 };
        const x2 = x + width;
        const y2 = y + height;
        if (x2 >= this._win.innerWidth) {
            offset.x = -width - COOR_MARGIN * 2;
        }
        if (y2 >= this._win.innerHeight) {
            offset.y = -height - COOR_MARGIN * 2;
        }
        this.posOffset.set(offset);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: CtxMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.1", type: CtxMenuComponent, isStandalone: true, selector: "ngx-ctx-menu", inputs: { menu: { classPropertyName: "menu", publicName: "menu", isSignal: true, isRequired: true, transformFunction: null } }, host: { listeners: { "document:mousedown": "onDocumentMousedown()" } }, providers: [provideWindow()], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, isSignal: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true, read: ViewContainerRef, isSignal: true }], ngImport: i0, template: "<!-- eslint-disable-next-line -->\n<div\n  #container\n  class=\"ctx-menu\"\n  [style.transform]=\"translate()\"\n  (mousedown)=\"$event.stopPropagation()\"\n>\n  <ng-container #content />\n</div>\n", styles: [".ctx-menu{position:absolute;border:1px solid var(--color-senary);background-color:var(--color-octonary);box-shadow:0 0 10px #00000080;border-radius:.2rem;animation:fade-in .2s ease 1 forwards;max-width:90vw}@keyframes fade-in{0%{opacity:0}to{opacity:1}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: CtxMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-ctx-menu', imports: [], providers: [provideWindow()], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- eslint-disable-next-line -->\n<div\n  #container\n  class=\"ctx-menu\"\n  [style.transform]=\"translate()\"\n  (mousedown)=\"$event.stopPropagation()\"\n>\n  <ng-container #content />\n</div>\n", styles: [".ctx-menu{position:absolute;border:1px solid var(--color-senary);background-color:var(--color-octonary);box-shadow:0 0 10px #00000080;border-radius:.2rem;animation:fade-in .2s ease 1 forwards;max-width:90vw}@keyframes fade-in{0%{opacity:0}to{opacity:1}}\n"] }]
        }], propDecorators: { onDocumentMousedown: [{
                type: HostListener,
                args: ['document:mousedown']
            }] } });

/* eslint-disable @typescript-eslint/no-explicit-any */
const DEFAULT_CONFIG = {};
class CtxMenuService {
    constructor() {
        this._menu = signal(null);
        this.menu = this._menu.asReadonly();
    }
    /**
     * Open a context menu.
     *
     * @param component The component representing the menu
     * @param event A mouse event with the absolute coordinates relative to the viewport
     * @param data Data passed to the menu
     */
    openMenu(component, event, data, config) {
        event.stopPropagation();
        const controller = new CtxMenuController(this._menu);
        const coor = {
            x: event.clientX,
            y: event.clientY,
        };
        const ctxMenu = {
            component,
            data,
            controller,
            coor,
            config: { ...DEFAULT_CONFIG, ...config },
        };
        this._menu.set(ctxMenu);
        return controller;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: CtxMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: CtxMenuService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: CtxMenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class CtxMenuOutletComponent {
    constructor() {
        this.ctxMenu = inject(CtxMenuService);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: CtxMenuOutletComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.1", type: CtxMenuOutletComponent, isStandalone: true, selector: "ngx-ctx-menu-outlet", ngImport: i0, template: "@if (ctxMenu.menu(); as menu) {\n  <ngx-ctx-menu [menu]=\"menu\" />\n}\n", styles: [":host{position:absolute;display:block;top:0}\n"], dependencies: [{ kind: "component", type: CtxMenuComponent, selector: "ngx-ctx-menu", inputs: ["menu"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: CtxMenuOutletComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-ctx-menu-outlet', imports: [CtxMenuComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (ctxMenu.menu(); as menu) {\n  <ngx-ctx-menu [menu]=\"menu\" />\n}\n", styles: [":host{position:absolute;display:block;top:0}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CTX_MENU_DATA, CtxMenuComponent, CtxMenuController, CtxMenuOutletComponent, CtxMenuService };
//# sourceMappingURL=ngx-templates-shared-context-menu.mjs.map
