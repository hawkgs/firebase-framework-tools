import { AfterViewInit, EmbeddedViewRef, InjectionToken, TemplateRef, ViewContainerRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { Coor, Rect } from './types';
import * as i0 from "@angular/core";
export type MovedEvent = {
    id: string;
    pos: number;
    affected: {
        id: string;
        pos: number;
    }[];
};
export type DragEvent = {
    id: string;
    /**
     * - `start` – A draggable has been pulled
     * - `move` – A draggable is being moved
     * - `drop` – A draggable has been dropped
     * - `anchored` – A draggable has been anchored to its slot (animation completed)
     */
    state: 'start' | 'move' | 'drop' | 'anchored';
    pos?: Coor;
};
type SlotSize = {
    colSpan: number;
    height: number;
};
export declare const DROP_GRID: InjectionToken<DropGridComponent>;
export declare class DropGridComponent implements AfterViewInit {
    private _zone;
    private _elRef;
    private _renderer;
    private _group;
    slotTemplate: import("@angular/core").Signal<TemplateRef<any>>;
    gridVcr: import("@angular/core").Signal<ViewContainerRef>;
    /**
     * Emits an event when a draggable has been moved and
     * returns the new positions of all affected items.
     */
    moved: import("@angular/core").OutputEmitterRef<MovedEvent>;
    /**
     * Emits events throughout drag lifecycle.
     * Runs outside of NgZone.
     */
    drag: import("@angular/core").OutputEmitterRef<DragEvent>;
    /**
     * Set the scroll container of the drop grid. If not set,
     * it will default to the grid's parent element.
     */
    scrollCont: import("@angular/core").InputSignal<Element | undefined>;
    /**
     * Set the number of columns in the grid. Default: `4`
     */
    columns: import("@angular/core").InputSignal<number>;
    /**
     * Set the cell gap/spacing. Default: `16px`
     */
    cellGap: import("@angular/core").InputSignal<number>;
    /**
     * Disable when the height of the draggable items can't vary.
     * This will activate more performant calculations upon drag.
     * The option is overrided irrespective of the provided value,
     * if the grid is part of a group (i.e. always enabled/true).
     *
     * Default: `true`
     */
    variableHeight: import("@angular/core").InputSignal<boolean>;
    gridTemplateColumns: import("@angular/core").Signal<string>;
    private _draggablesDirectives;
    private _draggablesViewRefs;
    private _draggablesEventsUnsubscribers;
    private _orderedDirectives;
    private _slot;
    private _dragged;
    private _draggedId?;
    private _dropInProgress;
    private _mouseOverTimeout?;
    private _slotSize;
    private _spacialGrid;
    private _viewIdxHover;
    private _disabled;
    private _scrollContRect;
    private _scrollInterval?;
    private _exHostPosNotifier;
    constructor();
    set disabled(v: boolean);
    /**
     * Returns `true`, if the current grid is
     * the drag host. Used for groups.
     */
    get isDragHost(): boolean;
    get dropInProgress(): boolean;
    private get _scrollCont();
    ngAfterViewInit(): void;
    insertDraggable(d: DraggableDirective): void;
    destroyDraggable(d: DraggableDirective): void;
    onDragStart({ elContPos, rect, id, }: {
        elContPos: Coor;
        rect: Rect;
        id: string;
    }): void;
    onDrag({ pos, rect }: {
        pos: Coor;
        rect: Rect;
    }): void;
    onDrop(e: {
        id: string;
    }): void;
    onAnchored(): void;
    /**
     * Hands over all needed state to the new drop grid host
     * and cleans the state of the current grid (old host).
     *
     * Used only for grouped grids.
     */
    handOverDragging(): {
        directive: DraggableDirective;
        viewRef: EmbeddedViewRef<unknown>;
        slotSize: SlotSize;
        positionsNotifier: () => void;
    };
    /**
     * Handles transfer from one draggable grid (host) to the current one.
     *
     * Available only for grouped grids.
     */
    private _initiateHandover;
    /**
     * Creates a slot element without inserting it
     * in a view container.
     */
    private _createSlot;
    /**
     * Subscribes to draggable directive event handlers and
     * stores their unsubscribers in the component's state.
     */
    private _subscribeToDraggableEvents;
    /**
     * Scroll the `scrollCont` up or down the page, if a draggable is
     * dragged to the top or the bottom of the scroll container.
     * a.k.a. Auto scrolling
     *
     * Horizontal scroll should be handled separately by the developer.
     *
     * @param draggableRect
     */
    private _scrollContainer;
    private _emitUpdatedPositions;
    /**
     * Create/calculate a spacial grid of all draggable elements
     * relative to the whole page (i.e. the coordinates of the
     * top-left and bottom-right points of each draggable in the grid)
     */
    private _calculateSpacialGrid;
    private _calculateDynamicSpacialGrid;
    private _calculateStaticSpacialGrid;
    /**
     * Helper method for calculating the spacial grid.
     *
     * Returns draggable objects in the order they are rendered.
     */
    private _getOrderedDraggables;
    /**
     * Clean all references of the provided directive
     */
    private _cleanAllReferences;
    /**
     * Required for the auto scrolling.
     * Should be called once the drag starts or a handover is performed.
     */
    private _calculateScrollContRect;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DropGridComponent, "ngx-drop-grid", never, { "scrollCont": { "alias": "scrollCont"; "required": false; "isSignal": true; }; "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "cellGap": { "alias": "cellGap"; "required": false; "isSignal": true; }; "variableHeight": { "alias": "variableHeight"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "moved": "moved"; "drag": "drag"; }, never, never, true, never>;
}
export {};
