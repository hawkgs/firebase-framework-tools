import { OnDestroy, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export type CompleteFn = () => void;
export declare class InfiniteScrollComponent implements OnInit, OnDestroy {
    private _win;
    private _doc;
    private _platformId;
    private _renderer;
    private _zone;
    private _endReached;
    private _listeners;
    /**
     * Provide a custom scroll container.
     *
     * Default: `window`
     */
    scrollCont: import("@angular/core").InputSignal<HTMLElement | null>;
    /**
     * Emitted when the end of the container is reached.
     *
     * @event CompleteFn – Should be called when the data is loaded.
     */
    loadNext: import("@angular/core").OutputEmitterRef<CompleteFn>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onLoadNext(): void;
    private _addEventListeners;
    static ɵfac: i0.ɵɵFactoryDeclaration<InfiniteScrollComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InfiniteScrollComponent, "ngx-infinite-scroll", never, { "scrollCont": { "alias": "scrollCont"; "required": false; "isSignal": true; }; }, { "loadNext": "loadNext"; }, never, never, true, never>;
}
