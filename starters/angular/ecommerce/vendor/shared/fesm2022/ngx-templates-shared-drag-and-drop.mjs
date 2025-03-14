import { DOCUMENT } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, Directive, inject, NgZone, ElementRef, Renderer2, viewChild, TemplateRef, ViewContainerRef, output, input, computed, Input, ChangeDetectionStrategy, Component, signal, effect } from '@angular/core';
import { WINDOW, provideWindow } from '@ngx-templates/shared/services';

const DROP_GRID_GROUP = new InjectionToken('DropGridGroup');
/**
 * Drop grid group host directive.
 *
 * Groups are NOT supported on a mobile.
 */
class DropGridGroupDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DropGridGroupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.2.2", type: DropGridGroupDirective, isStandalone: true, selector: "[ngxDropGridGroup]", providers: [
            { provide: DROP_GRID_GROUP, useValue: new Set() },
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DropGridGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxDropGridGroup]',
                    providers: [
                        { provide: DROP_GRID_GROUP, useValue: new Set() },
                    ],
                }]
        }] });

const DEFAULT_GRID_COLS = 4;
const DEFAULT_CELL_GAP = 16;
const MOUSEOVER_DELAY = 150;
// The size of the active area where the auto
// scroll is activated.
const HSCRL_ACTIVE_AREA = 50;
// The size of the maximal scroll step (in pixels)
// that can be reached during scroll.
const HSCRL_STEP = 5;
// The speed of the scroll is based on how deep
// inside the active area the mouse cursor is
// (continuous interval [0-1]). This constant
// controls how big the step size can become.
// Along with HSCRL_STEP, they determine how
// fast the auto scroll is.
const HSCRL_MAX_SPEED = 0.5;
const getViewRefElement = (vr) => vr.rootNodes[0];
// Calculates the distance between a cell and a given point
const getDistanceToCell = (cell, pt) => {
    const width = cell.x2 - cell.x1;
    const height = cell.y2 - cell.y1;
    const xCent = cell.x1 + width / 2;
    const yCent = cell.y1 + height / 2;
    const xDelta = xCent - pt.x;
    const yDelta = yCent - pt.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
};
const DROP_GRID = new InjectionToken('DROP_GRID');
class DropGridComponent {
    _zone = inject(NgZone);
    _elRef = inject(ElementRef);
    _renderer = inject(Renderer2);
    _group = inject(DROP_GRID_GROUP, { optional: true });
    slotTemplate = viewChild.required('slotTemplate', { read: TemplateRef });
    gridVcr = viewChild.required('grid', { read: ViewContainerRef });
    /**
     * Emits an event when a draggable has been moved and
     * returns the new positions of all affected items.
     */
    moved = output();
    /**
     * Emits events throughout drag lifecycle.
     * Runs outside of NgZone.
     */
    drag = output();
    /**
     * Set the scroll container of the drop grid. If not set,
     * it will default to the grid's parent element.
     */
    scrollCont = input();
    /**
     * Set the number of columns in the grid. Default: `4`
     */
    columns = input(DEFAULT_GRID_COLS);
    /**
     * Set the cell gap/spacing. Default: `16px`
     */
    cellGap = input(DEFAULT_CELL_GAP);
    /**
     * Disable when the height of the draggable items can't vary.
     * This will activate more performant calculations upon drag.
     * The option is overrided irrespective of the provided value,
     * if the grid is part of a group (i.e. always enabled/true).
     *
     * Default: `true`
     */
    variableHeight = input(true);
    gridTemplateColumns = computed(() => `repeat(${this.columns()}, minmax(0, 1fr))`);
    // ContentChildren does not work in our case due to the dynamic
    // nature of adding and remove views when transferring from one
    // group to another (the content children are not updated after
    // such operations).
    _draggablesDirectives = new Map();
    _draggablesViewRefs = new Map();
    _draggablesEventsUnsubscribers = new Map();
    _orderedDirectives = [];
    _slot = null; // Slot spacer `ViewRef`
    _dragged = null; // Currently dragged
    _draggedId; // Currently dragged directive ID
    _dropInProgress = false;
    _mouseOverTimeout;
    // Store in case you have to pass it to a group
    _slotSize = { colSpan: 0, height: 0 };
    _spacialGrid = [];
    _viewIdxHover = 0; // Index of the currently hovered `ViewRef`
    _disabled = false;
    // Scrolling/Auto scrolling
    _scrollContRect = { p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } };
    _scrollInterval;
    // Used for groups; Keeps a function that triggers `moved` event
    // on the former host after a draggable handover is completed
    // (in order to notify the users for the transfer).
    //
    // Note(Georgi): This is currently disabled since it's not needed.
    _exHostPosNotifier = null;
    constructor() {
        // Add the current grid to the
        // grids set, if part of a group.
        if (this._group) {
            this._group.add(this);
        }
    }
    set disabled(v) {
        this._disabled = v;
        for (const [, d] of this._draggablesDirectives) {
            d.disabled.set(v);
        }
    }
    /**
     * Returns `true`, if the current grid is
     * the drag host. Used for groups.
     */
    get isDragHost() {
        return !!this._slot;
    }
    get dropInProgress() {
        return this._dropInProgress;
    }
    get _scrollCont() {
        return this.scrollCont() || this._elRef.nativeElement.parentElement;
    }
    ngAfterViewInit() {
        this._zone.runOutsideAngular(() => {
            const el = this._elRef.nativeElement;
            this._renderer.listen(el, 'mouseenter', (e) => this._initiateHandover(e));
            // Sometimes the hand over initiation can't happen, if the drag occurred
            // very fast (mouseenter event precedes the slot creation). That's why,
            // there is a fallback mouseover handler that guarantees a handover.
            this._renderer.listen(el, 'mouseover', (e) => {
                if (this.isDragHost) {
                    return;
                }
                if (this._mouseOverTimeout) {
                    clearTimeout(this._mouseOverTimeout);
                }
                this._mouseOverTimeout = setTimeout(() => this._initiateHandover(e), MOUSEOVER_DELAY);
            });
        });
    }
    insertDraggable(d) {
        const draggableViewRef = d.templateRef.createEmbeddedView(null);
        const pos = d.position();
        let insertionIdx = 0;
        // Since we might receive the draggables unordered
        // and in non-consecutive order,
        // i.e. "pos 5" first, "pos 3" second, "pos 7" third, etc.
        // we need to make sure they are inserted at the
        // correct index in the view container.
        if (this._orderedDirectives.length) {
            insertionIdx = this._orderedDirectives.length;
            for (let i = 0; i < this._orderedDirectives.length; i++) {
                const dirPos = this._orderedDirectives[i].position();
                if (dirPos >= pos) {
                    insertionIdx = i;
                    break;
                }
            }
            this._orderedDirectives.splice(insertionIdx, 0, d);
        }
        else {
            this._orderedDirectives.push(d);
        }
        this.gridVcr().insert(draggableViewRef, insertionIdx);
        // If the element exists, this means we are dealing with a re-rendering.
        // So, we have to clean up the old view.
        if (this._draggablesDirectives.has(d.id())) {
            this._draggablesViewRefs.get(d.id())?.destroy();
        }
        // We need to set the native element of the draggable target and
        // subscribe to the events that are going to be emitted on user
        // interaction. This is an unconventional approach of using/applying
        // structural directives.
        d.element = getViewRefElement(draggableViewRef);
        d.initEvents();
        this._subscribeToDraggableEvents(d);
        if (this._disabled) {
            d.disabled.set(true);
        }
        this._draggablesDirectives.set(d.id(), d);
        this._draggablesViewRefs.set(d.id(), draggableViewRef);
    }
    destroyDraggable(d) {
        const draggableViewRef = this._draggablesViewRefs.get(d.id());
        draggableViewRef?.destroy();
        this._cleanAllReferences(d.id());
    }
    onDragStart({ elContPos, rect, id, }) {
        const directive = this._draggablesDirectives.get(id);
        directive?.anchor.set(elContPos);
        const draggableSize = directive?.elementSize() || 1;
        // Store the size of the slot in case the
        // grid is part of a group (we'll need to pass
        // that data during a hand over).
        this._slotSize = {
            colSpan: draggableSize,
            height: rect.p2.y - rect.p1.y,
        };
        this._slot = this._createSlot(this._slotSize);
        this._dragged = this._draggablesViewRefs.get(id) || null;
        this._draggedId = id;
        const gridVcr = this.gridVcr();
        const viewIdx = gridVcr.indexOf(this._dragged);
        gridVcr.insert(this._slot, viewIdx);
        this._viewIdxHover = viewIdx;
        this._calculateSpacialGrid();
        this._calculateScrollContRect();
        this.drag.emit({ id, state: 'start' });
    }
    onDrag({ pos, rect }) {
        if (!this._slot) {
            return;
        }
        // Since the coordinates returned from `ngxDraggable` are
        // relative to the viewport, we must add the `scrollTop`
        // in order to accommodate for the whole page.
        pos.y += this._scrollCont.scrollTop;
        // Check where the draggable is hovering and move the
        // slot spacer accordingly.
        for (const cell of this._spacialGrid) {
            if (this._viewIdxHover !== cell.viewRefIdx &&
                cell.x1 <= pos.x &&
                pos.x <= cell.x2 &&
                cell.y1 <= pos.y &&
                pos.y <= cell.y2) {
                this.gridVcr().move(this._slot, cell.viewRefIdx);
                this._viewIdxHover = cell.viewRefIdx;
                break;
            }
        }
        this._scrollContainer(rect);
        this.drag.emit({
            id: this._draggedId,
            state: 'move',
            pos,
        });
    }
    onDrop(e) {
        if (!this._slot) {
            return;
        }
        this._dropInProgress = true;
        const { x, y } = getViewRefElement(this._slot).getBoundingClientRect();
        this._zone.run(() => {
            this._draggablesDirectives.get(e.id)?.anchor.set({ x, y });
        });
        this.drag.emit({ id: e.id, state: 'drop' });
    }
    onAnchored() {
        if (!this._slot) {
            return;
        }
        this._dropInProgress = false;
        this._slot.destroy();
        // We have to manually clear the the slot
        // in order to prevent event handlers from executing.
        this._slot = null;
        const gridVcr = this.gridVcr();
        const currIdx = gridVcr.indexOf(this._dragged);
        const newIdx = this._viewIdxHover > currIdx
            ? this._viewIdxHover - 1
            : this._viewIdxHover;
        gridVcr.move(this._dragged, newIdx);
        // Notify for the updated positions
        this._emitUpdatedPositions();
        if (this._exHostPosNotifier) {
            // Note(Georgi): Currently disabled
            // this._exHostPosNotifier();
            this._exHostPosNotifier = null;
        }
        this.drag.emit({
            id: this._draggedId,
            state: 'anchored',
        });
    }
    /**
     * Hands over all needed state to the new drop grid host
     * and cleans the state of the current grid (old host).
     *
     * Used only for grouped grids.
     */
    handOverDragging() {
        // Destroy the slot
        this._slot?.destroy();
        this._slot = null;
        // Detach the draggable view ref from the current grid
        // without destroying it
        const viewRef = this._dragged;
        const idx = this.gridVcr().indexOf(viewRef);
        if (idx > -1) {
            this.gridVcr().detach(idx);
        }
        this._dragged = null;
        const id = this._draggedId;
        const directive = this._draggablesDirectives.get(id);
        // Clear all of the state related to the tranferred draggable
        // that is no longer needed or might interfere with proper
        // functioning of the feature
        this._cleanAllReferences(id);
        const unsubscriber = this._draggablesEventsUnsubscribers.get(id);
        unsubscriber();
        return {
            directive,
            viewRef,
            slotSize: { ...this._slotSize },
            positionsNotifier: () => this._emitUpdatedPositions(),
        };
    }
    /**
     * Handles transfer from one draggable grid (host) to the current one.
     *
     * Available only for grouped grids.
     */
    _initiateHandover(e) {
        if (!this._group || this.isDragHost) {
            return;
        }
        const grids = Array.from(this._group).filter((g) => g !== this);
        // Abort if there is a drop in progress somewhere
        const dropInProgress = grids.find((g) => g.dropInProgress);
        if (dropInProgress) {
            return;
        }
        // Determine if there is a drag host (excl. `this`)
        const dragHost = grids.find((g) => g.isDragHost);
        if (!dragHost) {
            return;
        }
        // Request a transfer from the old/current host and
        // set all required state properties
        const { viewRef, directive, slotSize, positionsNotifier } = dragHost.handOverDragging();
        this._dragged = viewRef;
        this._slotSize = slotSize;
        this._draggedId = directive.id();
        this._slot = this._createSlot(slotSize);
        this._exHostPosNotifier = positionsNotifier;
        // Save the references and subscribe to the draggable event handlers
        this._draggablesDirectives.set(directive.id(), directive);
        this._draggablesViewRefs.set(directive.id(), viewRef);
        // Note(Georgi): There might be a more efficient way
        // where we don't have unsubscribe and subscribe to the event
        // handlers on each transfer but that'll require a more
        // major overhaul of the drop grid.
        this._subscribeToDraggableEvents(directive);
        this._calculateSpacialGrid();
        this._calculateScrollContRect();
        // Set the default position/index of the slot to 0
        const gridVcr = this.gridVcr();
        this._viewIdxHover = 0;
        // If there are other draggables in the list,
        // find the closest one and use its position for
        // the slot
        if (this._spacialGrid.length > 1) {
            const pos = {
                x: e.clientX,
                y: e.clientY,
            };
            let minDist = Number.POSITIVE_INFINITY;
            let closestCell;
            for (const cell of this._spacialGrid) {
                const dist = getDistanceToCell(cell, pos);
                if (minDist > dist) {
                    minDist = dist;
                    closestCell = cell;
                }
            }
            if (closestCell) {
                this._viewIdxHover = closestCell.viewRefIdx;
            }
        }
        // Insert the draggable and the slot in the new VCR
        // of the new/current host
        gridVcr.insert(this._dragged, this._viewIdxHover);
        gridVcr.insert(this._slot, this._viewIdxHover);
        // We have to recalculate the grid after insertion of
        // the newly transferred item.
        //
        // Note(Georgi): There is room for some optimizations.
        this._calculateSpacialGrid();
        // Set the new anchor
        const { x, y } = this._slot.rootNodes[0].getBoundingClientRect();
        directive.anchor.set({ x, y });
    }
    /**
     * Creates a slot element without inserting it
     * in a view container.
     */
    _createSlot({ colSpan, height }) {
        const slot = this.slotTemplate().createEmbeddedView({});
        // Note(Georgi): Don't use the $implicit context of createEmbeddedView
        // to pass the col span and the height of the slot to the template.
        // The changes are applied after the spacial grid calculation which
        // breaks the grid, unless it's deferred via setTimeout.
        const [node] = slot.rootNodes;
        this._renderer.setStyle(node, 'height', height + 'px');
        this._renderer.setStyle(node, 'grid-column', 'span ' + colSpan);
        return slot;
    }
    /**
     * Subscribes to draggable directive event handlers and
     * stores their unsubscribers in the component's state.
     */
    _subscribeToDraggableEvents(d) {
        const unsubscribers = [
            d._dragStart.subscribe((e) => this.onDragStart(e)),
            d._dragMove.subscribe((e) => this.onDrag(e)),
            d._drop.subscribe((e) => this.onDrop(e)),
            d._anchored.subscribe(() => this.onAnchored()),
        ];
        const unsubscribeFn = () => {
            for (const fn of unsubscribers) {
                fn.unsubscribe();
            }
        };
        this._draggablesEventsUnsubscribers.set(d.id(), unsubscribeFn);
    }
    /**
     * Scroll the `scrollCont` up or down the page, if a draggable is
     * dragged to the top or the bottom of the scroll container.
     * a.k.a. Auto scrolling
     *
     * Horizontal scroll should be handled separately by the developer.
     *
     * @param draggableRect
     */
    _scrollContainer({ p1, p2 }) {
        if (this._scrollInterval) {
            clearInterval(this._scrollInterval);
        }
        const yCenter = (p2.y - p1.y) / 2 + p1.y;
        const yTop = yCenter - this._scrollContRect.p1.y;
        const yBottom = this._scrollContRect?.p2.y - yCenter;
        const dTop = HSCRL_ACTIVE_AREA - yTop;
        const dBottom = HSCRL_ACTIVE_AREA - yBottom;
        const cont = this._scrollCont;
        const scrolled = Math.ceil(cont.clientHeight + cont.scrollTop);
        if (dTop >= 0 && cont.scrollTop > 0) {
            const speed = Math.min(dTop / HSCRL_ACTIVE_AREA, HSCRL_MAX_SPEED);
            this._scrollInterval = setInterval(() => {
                cont.scrollTo(0, cont.scrollTop - HSCRL_STEP * speed);
            });
        }
        else if (dBottom >= 0 && cont.scrollHeight > scrolled) {
            const speed = Math.min(dBottom / HSCRL_ACTIVE_AREA, HSCRL_MAX_SPEED);
            this._scrollInterval = setInterval(() => {
                cont.scrollTo(0, cont.scrollTop + HSCRL_STEP * speed);
            });
        }
    }
    _emitUpdatedPositions() {
        const affected = [];
        let targetPos = -1;
        for (const [id, vr] of this._draggablesViewRefs) {
            const pos = this.gridVcr().indexOf(vr);
            if (id === this._draggedId) {
                targetPos = pos;
            }
            affected.push({ id, pos });
        }
        this.moved.emit({
            id: this._draggedId,
            pos: targetPos,
            affected,
        });
    }
    /**
     * Create/calculate a spacial grid of all draggable elements
     * relative to the whole page (i.e. the coordinates of the
     * top-left and bottom-right points of each draggable in the grid)
     */
    _calculateSpacialGrid() {
        this._spacialGrid = [];
        if (!this._draggablesViewRefs.size) {
            return;
        }
        // If the items don't have a variable height or are part
        // of a group, we can use a more performant way for calculating
        // the grid.
        if (!this.variableHeight() && !this._group) {
            this._calculateStaticSpacialGrid();
        }
        else {
            this._calculateDynamicSpacialGrid();
        }
    }
    _calculateDynamicSpacialGrid() {
        this._spacialGrid = this._getOrderedDraggables().map((draggable) => {
            // Ensure that we are using the slot position in
            // case the dragged element is outside the grid
            let element = draggable.directive.element;
            if (draggable.id === this._draggedId) {
                element = this._slot?.rootNodes[0];
            }
            const { x, y, width, height } = element.getBoundingClientRect();
            const yWithScroll = y + this._scrollCont.scrollTop;
            return {
                id: draggable.id,
                viewRefIdx: draggable.idx,
                x1: x,
                y1: yWithScroll,
                x2: width + x,
                y2: height + yWithScroll,
            };
        });
    }
    _calculateStaticSpacialGrid() {
        // This implementation relies on a single call of `getBoundingClientRect`.
        // The rest of the grid cell position are deduced from the first one.
        // It's a more complex approach compared to the straightforward
        // "getBoundingClientRect on each iteration", but it should be more
        // performant, especially for lower-end devices.
        // Get the draggables in the order that they are rendered
        const draggables = this._getOrderedDraggables();
        // Calculate the bounding rectangle for the first element
        const firstItem = draggables[0].directive;
        const { x: startX, y, width, height: cellHeight, } = firstItem.element.getBoundingClientRect();
        // Setup the initial positions and the gaps/spacing
        const startY = y + this._scrollCont.scrollTop;
        const cols = this.columns();
        const gap = this.cellGap();
        const firstItemSize = firstItem.elementSize();
        const cellWidth = (width - gap * (firstItemSize - 1)) / firstItemSize;
        let currX = startX;
        let currY = startY;
        let currWidth = 0;
        // Deduce the rest of the positions based on that
        for (const draggable of draggables) {
            const size = draggable.directive.elementSize();
            const width = cellWidth * size + gap * (size - 1);
            currWidth += size;
            if (currWidth > cols) {
                currY += cellHeight + gap;
                currX = startX;
                currWidth = size;
            }
            this._spacialGrid.push({
                id: draggable.id,
                viewRefIdx: draggable.idx,
                x1: currX,
                y1: currY,
                x2: currX + width,
                y2: currY + cellHeight,
            });
            currX += width + gap;
        }
    }
    /**
     * Helper method for calculating the spacial grid.
     *
     * Returns draggable objects in the order they are rendered.
     */
    _getOrderedDraggables() {
        const ordered = [];
        for (const [id, vr] of this._draggablesViewRefs) {
            ordered.push({
                id: id,
                viewRef: vr,
                idx: this.gridVcr()?.indexOf(vr),
                directive: this._draggablesDirectives.get(id),
            });
        }
        ordered.sort((a, b) => a.idx - b.idx);
        return ordered;
    }
    /**
     * Clean all references of the provided directive
     */
    _cleanAllReferences(id) {
        this._draggablesDirectives.delete(id);
        this._draggablesViewRefs.delete(id);
        const orderedIdx = this._orderedDirectives.findIndex((d) => d.id() === id);
        if (orderedIdx > -1) {
            this._orderedDirectives.splice(orderedIdx, 1);
        }
    }
    /**
     * Required for the auto scrolling.
     * Should be called once the drag starts or a handover is performed.
     */
    _calculateScrollContRect() {
        const { top, left, bottom, right } = this._scrollCont.getBoundingClientRect();
        this._scrollContRect = {
            p1: { x: left, y: top },
            p2: { x: right, y: bottom },
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DropGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.2", type: DropGridComponent, isStandalone: true, selector: "ngx-drop-grid", inputs: { scrollCont: { classPropertyName: "scrollCont", publicName: "scrollCont", isSignal: true, isRequired: false, transformFunction: null }, columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null }, cellGap: { classPropertyName: "cellGap", publicName: "cellGap", isSignal: true, isRequired: false, transformFunction: null }, variableHeight: { classPropertyName: "variableHeight", publicName: "variableHeight", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { moved: "moved", drag: "drag" }, providers: [
            {
                provide: DROP_GRID,
                useExisting: DropGridComponent,
            },
        ], viewQueries: [{ propertyName: "slotTemplate", first: true, predicate: ["slotTemplate"], descendants: true, read: TemplateRef, isSignal: true }, { propertyName: "gridVcr", first: true, predicate: ["grid"], descendants: true, read: ViewContainerRef, isSignal: true }], ngImport: i0, template: "<ng-template #slotTemplate>\n  <div class=\"slot\"></div>\n</ng-template>\n\n<section\n  class=\"grid\"\n  [style.grid-template-columns]=\"gridTemplateColumns()\"\n  [style.gap]=\"cellGap() + 'px'\"\n>\n  <ng-container #grid />\n</section>\n", styles: [".grid{display:grid}.slot{box-sizing:border-box;border:var(--grid-slot-border, none);border-radius:var(--grid-slot-border-radius, .25rem);background:var(--grid-slot-background, var(--color-tertiary));overflow-x:hidden}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DropGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-drop-grid', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: DROP_GRID,
                            useExisting: DropGridComponent,
                        },
                    ], template: "<ng-template #slotTemplate>\n  <div class=\"slot\"></div>\n</ng-template>\n\n<section\n  class=\"grid\"\n  [style.grid-template-columns]=\"gridTemplateColumns()\"\n  [style.gap]=\"cellGap() + 'px'\"\n>\n  <ng-container #grid />\n</section>\n", styles: [".grid{display:grid}.slot{box-sizing:border-box;border:var(--grid-slot-border, none);border-radius:var(--grid-slot-border-radius, .25rem);background:var(--grid-slot-background, var(--color-tertiary));overflow-x:hidden}\n"] }]
        }], ctorParameters: () => [], propDecorators: { disabled: [{
                type: Input
            }] } });

/**
 * Returns the coordinates of the mouse/finger based on the event type.
 *
 * @param e Mouse or touch event
 * @returns The position as `Coor`
 */
const getClientPointerPos = (e) => {
    if (e instanceof MouseEvent) {
        return { x: e.clientX, y: e.clientY };
    }
    return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
    };
};

// The duration of the rappel animation after the
// user has released the draggable element.
const RAPPEL_ANIM_DURR = 300;
// Allow for some leeway clicking the draggable element.
// The drag functionality will be activated after the specified
// time, if the user is still holding the element.
const DRAG_ACTIVE_AFTER = 200;
const DRAG_ACTIVE_AFTER_TOUCH = 1000;
// The level of the opacity while the target is being dragged.
const DRAG_OPACITY = 0.8;
/**
 * Adds draggable behavior to an element. Should be used as
 * a structural directive  along with `ngx-drop-grid`.
 */
class DraggableDirective {
    templateRef = inject(TemplateRef);
    _doc = inject(DOCUMENT);
    _win = inject(WINDOW);
    _zone = inject(NgZone);
    _renderer = inject(Renderer2);
    _grid = inject(DROP_GRID, { optional: true });
    _listeners = [];
    _dragging = false;
    _elMidpoint = null;
    _relativeMousePos = { x: 0, y: 0 };
    _dragActivatorTimeout;
    _element;
    /**
     * ID of the draggable element. Default: `'0'`
     */
    id = input('0', { alias: 'ngxDraggable' });
    /**
     * Represents the draggable size in the `ngx-drop-grid`.
     * Shouldn't exceed the number of grid columns. Default: `1`
     */
    elementSize = input(1, { alias: 'ngxDraggableSize' });
    /**
     * Zero-based position or order of the draggable element in the `ngx-drop-grid`.
     * Not dynamic.
     */
    position = input(0, { alias: 'ngxDraggablePosition' });
    /**
     * The columns number in the `ngx-drop-grid`
     */
    gridColumns = input(1, { alias: 'ngxDraggableCols' });
    /**
     * Disables the drag functionality.
     */
    disabled = signal(false);
    /**
     * The position where the draggable will be placed when dropped.
     */
    anchor = signal(null);
    /**
     * INTERNAL USE ONLY. Emitted when the drag starts.
     *
     * - `elContPos` represents the relative to the viewport top-left
     * coordinates of the draggable target
     * - `id` is the ID of the draggable
     */
    _dragStart = output();
    /**
     * INTERNAL USE ONLY. Emitted on drag move.
     *
     * - `pos` represents the relative to the viewport mid/center coordinates
     * of the draggable target
     * - `rect` represents the coordinates of the bounding rectangle of the
     * draggable target
     * - `id` is the ID of the draggable
     */
    _dragMove = output();
    /**
     * INTERNAL USE ONLY. Emitted when the draggable is dropped.
     */
    _drop = output();
    /**
     * INTERNAL USE ONLY. Emitted when the drop animation is completed,
     * i.e. the target is now anchored
     */
    _anchored = output();
    /**
     * Native element of the draggable target.
     */
    set element(v) {
        this._element = v;
        this._setStyles({ 'grid-column': 'span ' + this._renderedSize() });
    }
    get element() {
        return this._element;
    }
    _renderedSize = computed(() => Math.min(this.elementSize(), this.gridColumns()));
    constructor() {
        effect(() => {
            this._setStyles({ 'grid-column': 'span ' + this._renderedSize() });
        });
    }
    ngOnInit() {
        if (this._grid) {
            this._grid.insertDraggable(this);
        }
    }
    ngOnDestroy() {
        for (const cb of this._listeners) {
            cb();
        }
        if (this._grid) {
            this._grid.destroyDraggable(this);
        }
    }
    /**
     * Initialize all draggable events.
     *
     * Note: Has to be called manually after the `element` has been defined.
     */
    initEvents() {
        if (!this._element) {
            throw new Error('DraggableDirective: Missing element');
        }
        this._zone.runOutsideAngular(() => {
            const dragStart = this._onDragStart.bind(this);
            const dragMove = this._onDragMove.bind(this);
            const dragEnd = this._onDragEnd.bind(this);
            this._listeners = [
                this._renderer.listen(this._element, 'mousedown', dragStart),
                this._renderer.listen(this._doc, 'mousemove', dragMove),
                this._renderer.listen(this._doc, 'mouseup', dragEnd),
                this._renderer.listen(this._element, 'touchstart', dragStart),
                this._renderer.listen(this._doc, 'touchend', dragEnd),
            ];
            // Since we need to prevent panning on a mobile device
            // while dragging but the default behavior of Renderer2.listen
            // is to optimize `touchmove` event listeners by making them passive,
            // we have to use the native API instead. This, obviously,
            // presents a performance hit given that the listener is active
            // but, if we prevent the default behavior on `touchstart`,
            // we will block all subsequent click events originating from
            // the draggable.
            const listener = (e) => {
                e.preventDefault();
                dragMove(e);
            };
            this._element.addEventListener('touchmove', listener);
            this._listeners.push(() => this._element.removeEventListener('touchmove', listener));
        });
    }
    _onDragStart(e) {
        if (this.disabled()) {
            return;
        }
        this._firefoxUserSelectMouseEventsPatch();
        const activationDelay = !this._hasTouchSupport()
            ? DRAG_ACTIVE_AFTER
            : DRAG_ACTIVE_AFTER_TOUCH;
        this._dragActivatorTimeout = setTimeout(() => {
            this._dragging = true;
            const { x, y, width, height } = this._element.getBoundingClientRect();
            const pos = { x, y };
            const client = getClientPointerPos(e);
            this._relativeMousePos = {
                x: client.x - x,
                y: client.y - y,
            };
            this._applyDraggableStyles(pos, { x: width, y: height });
            // Clear text selection, if any
            this._win.getSelection()?.removeAllRanges();
            if (!this._elMidpoint) {
                this._elMidpoint = {
                    x: width / 2,
                    y: height / 2,
                };
            }
            this._dragStart.emit({
                id: this.id(),
                elContPos: pos,
                rect: {
                    p1: pos,
                    p2: {
                        x: x + width,
                        y: y + height,
                    },
                },
            });
        }, activationDelay);
    }
    _onDragMove(e) {
        if (!this._dragging) {
            return;
        }
        // This will disable auto-scroll. However,
        // it will also prevent the undesired text
        // selection.
        if (e instanceof MouseEvent) {
            e.preventDefault();
        }
        const client = getClientPointerPos(e);
        const offset = this._relativeMousePos;
        const pos = {
            x: client.x - offset.x,
            y: client.y - offset.y,
        };
        this._move(pos);
        this._dragMove.emit({
            pos: {
                x: pos.x + this._elMidpoint.x,
                y: pos.y + this._elMidpoint.y,
            },
            rect: {
                p1: pos,
                p2: {
                    x: pos.x + this._elMidpoint.x * 2,
                    y: pos.y + this._elMidpoint.y * 2,
                },
            },
            id: this.id(),
        });
    }
    _onDragEnd() {
        if (this._dragActivatorTimeout) {
            clearTimeout(this._dragActivatorTimeout);
        }
        if (this._dragging) {
            this._drop.emit({ id: this.id() });
            this._moveToAnchorPos();
            this._dragging = false;
        }
    }
    _applyDraggableStyles(initPos, size) {
        this._setStyles({
            position: 'fixed',
            top: '0',
            left: '0',
            opacity: DRAG_OPACITY.toString(),
            width: size.x + 'px',
            height: size.y + 'px',
            'pointer-events': 'none',
            'touch-action': 'none',
            'z-index': '99999999',
        });
        // Doc styles
        this._renderer.setStyle(this._doc.body, 'user-select', 'none');
        this._renderer.setStyle(this._doc.body, '-webkit-user-select', 'none');
        this._move(initPos);
    }
    _removeDraggableStyles() {
        this._removeStyles([
            'transition',
            'position',
            'top',
            'left',
            'opacity',
            'transform',
            'width',
            'height',
            'pointer-events',
            'touch-action',
            'user-select',
            'z-index',
        ]);
        // Doc styles
        this._renderer.removeStyle(this._doc.body, 'user-select');
        this._renderer.removeStyle(this._doc.body, '-webkit-user-select');
    }
    _move(coor) {
        const translate = `translate(${coor.x}px, ${coor.y}px)`;
        this._renderer.setStyle(this._element, 'transform', translate);
    }
    /**
     * Moves/rappels the draggable target element to its
     * new position after it was released.
     */
    _moveToAnchorPos() {
        const anchor = this.anchor();
        if (!anchor) {
            this._removeStyles(['opacity']);
            this._anchored.emit();
            return;
        }
        this._renderer.setStyle(this._element, 'transition', `transform ${RAPPEL_ANIM_DURR}ms ease`);
        this._move(anchor);
        setTimeout(() => {
            this._removeDraggableStyles();
            this._anchored.emit();
        }, RAPPEL_ANIM_DURR);
    }
    /** Set styles to the target element */
    _setStyles(stylesObj) {
        for (const cssProp in stylesObj) {
            const value = stylesObj[cssProp];
            this._renderer.setStyle(this._element, cssProp, value);
        }
    }
    /** Remove styles from the target element */
    _removeStyles(cssProps) {
        for (const p of cssProps) {
            this._renderer.removeStyle(this._element, p);
        }
    }
    _hasTouchSupport() {
        return ('ontouchstart' in this._win || this._win.navigator.maxTouchPoints > 0);
    }
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
    _firefoxUserSelectMouseEventsPatch() {
        const userAgent = this._win.navigator.userAgent.toLowerCase();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (userAgent.includes('firefox') && !!this._grid._group) {
            this._setStyles({ 'user-select': 'none' });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DraggableDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "19.2.2", type: DraggableDirective, isStandalone: true, selector: "[ngxDraggable]", inputs: { id: { classPropertyName: "id", publicName: "ngxDraggable", isSignal: true, isRequired: false, transformFunction: null }, elementSize: { classPropertyName: "elementSize", publicName: "ngxDraggableSize", isSignal: true, isRequired: false, transformFunction: null }, position: { classPropertyName: "position", publicName: "ngxDraggablePosition", isSignal: true, isRequired: false, transformFunction: null }, gridColumns: { classPropertyName: "gridColumns", publicName: "ngxDraggableCols", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { _dragStart: "_dragStart", _dragMove: "_dragMove", _drop: "_drop", _anchored: "_anchored" }, providers: [provideWindow()], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: DraggableDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxDraggable]',
                    providers: [provideWindow()],
                }]
        }], ctorParameters: () => [] });

const DRAG_AND_DROP_DIRECTIVES = [
    DraggableDirective,
    DropGridComponent,
    DropGridGroupDirective,
];

/**
 * Generated bundle index. Do not edit.
 */

export { DRAG_AND_DROP_DIRECTIVES, DraggableDirective, DropGridComponent, DropGridGroupDirective };
//# sourceMappingURL=ngx-templates-shared-drag-and-drop.mjs.map
