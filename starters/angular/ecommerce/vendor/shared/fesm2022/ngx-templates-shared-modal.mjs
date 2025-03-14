import * as i0 from '@angular/core';
import { signal, Injectable, InjectionToken, inject, ChangeDetectorRef, input, viewChild, ViewContainerRef, Injector, HostListener, ChangeDetectionStrategy, Component, Renderer2, effect } from '@angular/core';
import { List } from 'immutable';
import { DOCUMENT } from '@angular/common';
import { IconComponent } from '@ngx-templates/shared/icon';

class ModalController {
    constructor(_id, _modals) {
        this._id = _id;
        this._modals = _modals;
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
        this._resolver(result);
        this._modals.update((modals) => {
            const idx = modals.findIndex((m) => m.id === this._id);
            return modals.remove(idx);
        });
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const DEFAULT_CONFIG = {
    modalWindowUi: true,
    animated: true,
};
class ModalService {
    constructor() {
        this._modals = signal(List([]));
        this._ct = 0;
        this.modals = this._modals.asReadonly();
    }
    /**
     * Creates a modal by a provided content component.
     *
     * The first template type represents the input data, if any.
     * The second one – the response data, if any.
     *
     * @param component Modal content component
     * @param data Data passed to the content
     * @returns A modal controller
     */
    createModal(component, data, config) {
        const controller = new ModalController(this._ct, this._modals);
        const modal = {
            component,
            data,
            controller,
            id: this._ct,
            config: { ...DEFAULT_CONFIG, ...config },
        };
        this._modals.update((m) => m.push(modal));
        this._ct++;
        return controller;
    }
    /**
     * Closes currently opened modal on focus.
     */
    closeCurrent() {
        if (this._modals().size) {
            this._modals.update((modals) => modals.remove(modals.size - 1));
        }
    }
    /**
     * Close all opened modals.
     */
    closeAll() {
        this._modals.set(List([]));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const MODAL_DATA = new InjectionToken('MODAL_DATA');
class ModalComponent {
    constructor() {
        this._cdRef = inject(ChangeDetectorRef);
        this.modal = input.required();
        this.content = viewChild.required('content', { read: ViewContainerRef });
        this._clickFlag = false;
    }
    /**
     * Create the modal content component and insert it
     * in the host view container.
     */
    ngAfterViewInit() {
        const modal = this.modal();
        const injector = this._createInjector(modal.controller, modal.data, modal.config.injector);
        this.content().createComponent(modal.component, { injector });
        // We need to run a CD in order to avoid NG0100
        this._cdRef.detectChanges();
    }
    /**
     * Close the modal, if the overlay is clicked.
     */
    onHostMousedown() {
        if (!this._clickFlag) {
            this.modal().controller.close();
        }
        this._clickFlag = false;
    }
    onModalMousedown() {
        this._clickFlag = true;
    }
    /**
     * Create an injector that includes the modal controller and the modal data
     * that are then passed to the modal content component for rendering and/or control.
     */
    _createInjector(modalCtrl, data, parentInjector) {
        const providers = [
            {
                provide: MODAL_DATA,
                useValue: data,
            },
            {
                provide: ModalController,
                useValue: modalCtrl,
            },
        ];
        return Injector.create({
            providers,
            parent: parentInjector,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.1", type: ModalComponent, isStandalone: true, selector: "ngx-modal", inputs: { modal: { classPropertyName: "modal", publicName: "modal", isSignal: true, isRequired: true, transformFunction: null } }, host: { listeners: { "mousedown": "onHostMousedown()" } }, viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true, read: ViewContainerRef, isSignal: true }], ngImport: i0, template: "<!-- eslint-disable-next-line -->\n<div\n  class=\"modal\"\n  [class.window-ui]=\"modal().config.modalWindowUi\"\n  [class.animated]=\"modal().config.animated\"\n  (mousedown)=\"onModalMousedown()\"\n>\n  <ng-container #content />\n</div>\n", styles: [":host{display:flex;align-items:center;justify-content:center;z-index:999999;background-color:#000000bf;position:fixed;inset:0;animation:blur-in .5s ease;animation-fill-mode:forwards;animation-iteration-count:1}:host .modal.window-ui{background-color:var(--color-bg);padding:1rem;border-radius:.25rem;border:1px solid var(--color-senary);box-shadow:0 0 10px #00000080;min-width:250px}:host .modal.window-ui.animated{animation:appear .3s ease;animation-fill-mode:forwards;animation-iteration-count:1}@keyframes blur-in{0%{-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0)}to{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}}@keyframes appear{0%{opacity:0;transform:translateY(-100%) scale(.75)}to{opacity:1;transform:translateY(0) scale(1)}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-modal', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- eslint-disable-next-line -->\n<div\n  class=\"modal\"\n  [class.window-ui]=\"modal().config.modalWindowUi\"\n  [class.animated]=\"modal().config.animated\"\n  (mousedown)=\"onModalMousedown()\"\n>\n  <ng-container #content />\n</div>\n", styles: [":host{display:flex;align-items:center;justify-content:center;z-index:999999;background-color:#000000bf;position:fixed;inset:0;animation:blur-in .5s ease;animation-fill-mode:forwards;animation-iteration-count:1}:host .modal.window-ui{background-color:var(--color-bg);padding:1rem;border-radius:.25rem;border:1px solid var(--color-senary);box-shadow:0 0 10px #00000080;min-width:250px}:host .modal.window-ui.animated{animation:appear .3s ease;animation-fill-mode:forwards;animation-iteration-count:1}@keyframes blur-in{0%{-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0)}to{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}}@keyframes appear{0%{opacity:0;transform:translateY(-100%) scale(.75)}to{opacity:1;transform:translateY(0) scale(1)}}\n"] }]
        }], propDecorators: { onHostMousedown: [{
                type: HostListener,
                args: ['mousedown']
            }] } });

class ModalOutletComponent {
    constructor() {
        this._doc = inject(DOCUMENT);
        this._modalService = inject(ModalService);
        this._renderer = inject(Renderer2);
        this.modals = this._modalService.modals;
        effect(() => {
            const body = this._doc.body;
            if (this.modals().size) {
                this._renderer.setStyle(body, 'overflow', 'hidden');
            }
            else {
                this._renderer.setStyle(body, 'overflow', null);
            }
        });
    }
    closeCurrentVisibleModal() {
        this._modalService.closeCurrent();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalOutletComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.1", type: ModalOutletComponent, isStandalone: true, selector: "ngx-modal-outlet", host: { listeners: { "document:keydown.escape": "closeCurrentVisibleModal()" } }, ngImport: i0, template: "@for (m of modals(); track m.id; let i = $index) {\n  <ngx-modal\n    [modal]=\"m\"\n    [style.visibility]=\"i === modals().size - 1 ? 'visible' : 'hidden'\"\n  />\n}\n", styles: [":host{position:fixed;display:block;top:0}\n"], dependencies: [{ kind: "component", type: ModalComponent, selector: "ngx-modal", inputs: ["modal"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalOutletComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-modal-outlet', imports: [ModalComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (m of modals(); track m.id; let i = $index) {\n  <ngx-modal\n    [modal]=\"m\"\n    [style.visibility]=\"i === modals().size - 1 ? 'visible' : 'hidden'\"\n  />\n}\n", styles: [":host{position:fixed;display:block;top:0}\n"] }]
        }], ctorParameters: () => [], propDecorators: { closeCurrentVisibleModal: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });

class ModalContentComponent {
    constructor() {
        this.controller = input.required();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.1", type: ModalContentComponent, isStandalone: true, selector: "ngx-modal-content", inputs: { controller: { classPropertyName: "controller", publicName: "controller", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<p class=\"title\">\n  <span><ng-content select=\"[title]\" /></span>\n  <button (click)=\"controller().close()\">\n    <ngx-icon name=\"Close\" />\n  </button>\n</p>\n<div class=\"content\">\n  <ng-content select=\"[content]\" />\n</div>\n", styles: [":host .title{font-size:1rem;font-weight:500;margin-top:.5rem;margin-bottom:.5rem}:host .content{font-size:.875rem;font-style:normal;line-height:1rem}@media (max-width: 640px){:host .content{font-size:1rem}}:host{display:block}:host .title{display:flex;align-items:center;justify-content:space-between;margin:0 0 1rem}:host .title span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .title button{padding:0;background-color:transparent;border:none;cursor:pointer}:host .title button ngx-icon{--icon-color: var(--color-quinary);transition:fill .3s ease}:host .title button:hover>ngx-icon{--icon-color: var(--color-tertiary)}:host .content{max-height:80vh;overflow-y:auto;overflow-x:hidden}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "ngx-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ModalContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-modal-content', imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<p class=\"title\">\n  <span><ng-content select=\"[title]\" /></span>\n  <button (click)=\"controller().close()\">\n    <ngx-icon name=\"Close\" />\n  </button>\n</p>\n<div class=\"content\">\n  <ng-content select=\"[content]\" />\n</div>\n", styles: [":host .title{font-size:1rem;font-weight:500;margin-top:.5rem;margin-bottom:.5rem}:host .content{font-size:.875rem;font-style:normal;line-height:1rem}@media (max-width: 640px){:host .content{font-size:1rem}}:host{display:block}:host .title{display:flex;align-items:center;justify-content:space-between;margin:0 0 1rem}:host .title span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .title button{padding:0;background-color:transparent;border:none;cursor:pointer}:host .title button ngx-icon{--icon-color: var(--color-quinary);transition:fill .3s ease}:host .title button:hover>ngx-icon{--icon-color: var(--color-tertiary)}:host .content{max-height:80vh;overflow-y:auto;overflow-x:hidden}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MODAL_DATA, ModalComponent, ModalContentComponent, ModalController, ModalOutletComponent, ModalService };
//# sourceMappingURL=ngx-templates-shared-modal.mjs.map
