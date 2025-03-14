import { AfterViewInit, InjectionToken, ViewContainerRef } from '@angular/core';
import { Modal } from '../types';
import * as i0 from "@angular/core";
export declare const MODAL_DATA: InjectionToken<unknown>;
export declare class ModalComponent<D, R> implements AfterViewInit {
    private _cdRef;
    modal: import("@angular/core").InputSignal<Modal<D, R>>;
    content: import("@angular/core").Signal<ViewContainerRef>;
    private _clickFlag;
    /**
     * Create the modal content component and insert it
     * in the host view container.
     */
    ngAfterViewInit(): void;
    /**
     * Close the modal, if the overlay is clicked.
     */
    onHostMousedown(): void;
    onModalMousedown(): void;
    /**
     * Create an injector that includes the modal controller and the modal data
     * that are then passed to the modal content component for rendering and/or control.
     */
    private _createInjector;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalComponent<any, any>, "ngx-modal", never, { "modal": { "alias": "modal"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
