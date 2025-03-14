import { WritableSignal } from '@angular/core';
import { CtxMenu } from './types';
export declare class CtxMenuController<T = void> {
    private _menu;
    private _resolver;
    constructor(_menu: WritableSignal<CtxMenu<unknown, unknown> | null>);
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
