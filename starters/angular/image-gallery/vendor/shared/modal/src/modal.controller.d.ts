import { WritableSignal } from '@angular/core';
import { List } from 'immutable';
import { Modal } from './types';
export declare class ModalController<T = void> {
    private _id;
    private _modals;
    private _resolver;
    constructor(_id: number, _modals: WritableSignal<List<Modal<unknown, unknown>>>);
    /**
     * A `Promise` that is resolved when the target modal is closed.
     */
    closed: Promise<T | undefined>;
    /**
     * Close the target modal.
     *
     * @param result Provided response data
     */
    close(result?: T): void;
}
