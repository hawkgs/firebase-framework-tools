import { OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Coor, Rect } from './types';
import * as i0 from "@angular/core";
/**
 * Adds draggable behavior to an element. Should be used as
 * a structural directive  along with `ngx-drop-grid`.
 */
export declare class DraggableDirective implements OnInit, OnDestroy {
    templateRef: TemplateRef<any>;
    private _doc;
    private _win;
    private _zone;
    private _renderer;
    private _grid;
    private _listeners;
    private _dragging;
    private _elMidpoint;
    private _relativeMousePos;
    private _dragActivatorTimeout?;
    private _element;
    /**
     * ID of the draggable element. Default: `'0'`
     */
    id: import("@angular/core").InputSignal<string>;
    /**
     * Represents the draggable size in the `ngx-drop-grid`.
     * Shouldn't exceed the number of grid columns. Default: `1`
     */
    elementSize: import("@angular/core").InputSignal<number>;
    /**
     * Zero-based position or order of the draggable element in the `ngx-drop-grid`.
     * Not dynamic.
     */
    position: import("@angular/core").InputSignal<number>;
    /**
     * The columns number in the `ngx-drop-grid`
     */
    gridColumns: import("@angular/core").InputSignal<number>;
    /**
     * Disables the drag functionality.
     */
    disabled: import("@angular/core").WritableSignal<boolean>;
    /**
     * The position where the draggable will be placed when dropped.
     */
    anchor: import("@angular/core").WritableSignal<Coor | null>;
    /**
     * INTERNAL USE ONLY. Emitted when the drag starts.
     *
     * - `elContPos` represents the relative to the viewport top-left
     * coordinates of the draggable target
     * - `id` is the ID of the draggable
     */
    _dragStart: import("@angular/core").OutputEmitterRef<{
        elContPos: Coor;
        rect: Rect;
        id: string;
    }>;
    /**
     * INTERNAL USE ONLY. Emitted on drag move.
     *
     * - `pos` represents the relative to the viewport mid/center coordinates
     * of the draggable target
     * - `rect` represents the coordinates of the bounding rectangle of the
     * draggable target
     * - `id` is the ID of the draggable
     */
    _dragMove: import("@angular/core").OutputEmitterRef<{
        pos: Coor;
        rect: Rect;
        id: string;
    }>;
    /**
     * INTERNAL USE ONLY. Emitted when the draggable is dropped.
     */
    _drop: import("@angular/core").OutputEmitterRef<{
        id: string;
    }>;
    /**
     * INTERNAL USE ONLY. Emitted when the drop animation is completed,
     * i.e. the target is now anchored
     */
    _anchored: import("@angular/core").OutputEmitterRef<void>;
    /**
     * Native element of the draggable target.
     */
    set element(v: Element);
    get element(): Element;
    private _renderedSize;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Initialize all draggable events.
     *
     * Note: Has to be called manually after the `element` has been defined.
     */
    initEvents(): void;
    private _onDragStart;
    private _onDragMove;
    private _onDragEnd;
    private _applyDraggableStyles;
    private _removeDraggableStyles;
    private _move;
    /**
     * Moves/rappels the draggable target element to its
     * new position after it was released.
     */
    private _moveToAnchorPos;
    /** Set styles to the target element */
    private _setStyles;
    /** Remove styles from the target element */
    private _removeStyles;
    private _hasTouchSupport;
    /**
     * This is a patch for an undetermined issue occurring only in Firefox.
     * If the draggable contains any sort of selectable text that is selected
     * prior to the activation of the drag functionality (timeout execution),
     * dragging the draggable across grids outside of the current host grid
     * (e.g. in a group setting) won't trigger any of their mouse events that
     * are crucial for performing a successful draggable transfer. This, in
     * effect, breaks the groups functionality. Unfortunately, the only viable
     * option at this stage is to disable text selection for the target element
     * prior to the drag functionality activation since programatically clearing
     * the text selection doesn't render positive results, nor disabling the
     * selection after activation as intended; therefore, draggable elements in
     * a group, in Firefox doesn't support text selection for now.
     */
    private _firefoxUserSelectMouseEventsPatch;
    static ɵfac: i0.ɵɵFactoryDeclaration<DraggableDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DraggableDirective, "[ngxDraggable]", never, { "id": { "alias": "ngxDraggable"; "required": false; "isSignal": true; }; "elementSize": { "alias": "ngxDraggableSize"; "required": false; "isSignal": true; }; "position": { "alias": "ngxDraggablePosition"; "required": false; "isSignal": true; }; "gridColumns": { "alias": "ngxDraggableCols"; "required": false; "isSignal": true; }; }, { "_dragStart": "_dragStart"; "_dragMove": "_dragMove"; "_drop": "_drop"; "_anchored": "_anchored"; }, never, never, true, never>;
}
