import { Type } from '@angular/core';
import { ModalController } from './modal.controller';
import { List } from 'immutable';
import { Modal, ModalConfig } from './types';
import * as i0 from "@angular/core";
export declare class ModalService {
    private _modals;
    private _ct;
    modals: import("@angular/core").Signal<List<Modal<any, any>>>;
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
    createModal<D = void, R = void>(component: Type<unknown>, data?: D, config?: Partial<ModalConfig>): ModalController<R>;
    /**
     * Closes currently opened modal on focus.
     */
    closeCurrent(): void;
    /**
     * Close all opened modals.
     */
    closeAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalService>;
}
