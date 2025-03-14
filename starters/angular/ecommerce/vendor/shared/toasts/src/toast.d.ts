import { WritableSignal } from '@angular/core';
import { List } from 'immutable';
import { ToastConfig } from './types';
/**
 * Toast item
 */
export declare class Toast {
    name: string;
    private _list;
    createdAt: number;
    config: ToastConfig;
    private _destroyTimeout;
    private _destroyResolver;
    destroyPromise: Promise<void>;
    constructor(name: string, _list: WritableSignal<List<Toast>>, config?: Partial<ToastConfig>);
    /**
     * Remove the toast from the list (i.e. the DOM)
     */
    destroy(): void;
}
