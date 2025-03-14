import * as i0 from '@angular/core';
import { inject, PLATFORM_ID, Renderer2, NgZone, input, output, ChangeDetectionStrategy, Component } from '@angular/core';
import { WINDOW } from '@ngx-templates/shared/services';
import { IconComponent } from '@ngx-templates/shared/icon';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// This is a scroll offset value that
// takes into account the relative size
// of the footer.
const SCROLL_OFFSET = 320;
class InfiniteScrollComponent {
    constructor() {
        this._win = inject(WINDOW);
        this._doc = inject(DOCUMENT);
        this._platformId = inject(PLATFORM_ID);
        this._renderer = inject(Renderer2);
        this._zone = inject(NgZone);
        this._endReached = false;
        this._listeners = [];
        /**
         * Provide a custom scroll container.
         *
         * Default: `window`
         */
        this.scrollCont = input(null);
        /**
         * Emitted when the end of the container is reached.
         *
         * @event CompleteFn – Should be called when the data is loaded.
         */
        this.loadNext = output();
    }
    ngOnInit() {
        this._addEventListeners();
    }
    ngOnDestroy() {
        for (const l of this._listeners) {
            l();
        }
    }
    onLoadNext() {
        this._endReached = true;
        this.loadNext.emit(() => {
            this._endReached = false;
        });
    }
    _addEventListeners() {
        if (!isPlatformBrowser(this._platformId)) {
            return;
        }
        this._zone.runOutsideAngular(() => {
            const scrollCont = this.scrollCont();
            let listener;
            const endReached = (scrollHeight, scrolledY) => {
                if (!this._endReached && SCROLL_OFFSET >= scrollHeight - scrolledY) {
                    this._zone.run(() => this.onLoadNext());
                }
            };
            if (!scrollCont) {
                listener = this._renderer.listen(this._win, 'scroll', () => {
                    const scrolledY = this._win.scrollY + this._win.innerHeight;
                    const scrollHeight = this._doc.body.scrollHeight;
                    endReached(scrollHeight, scrolledY);
                });
            }
            else {
                const el = scrollCont;
                listener = this._renderer.listen(el, 'scroll', () => {
                    // Since the scroll could be inverted, we are using the absolute value.
                    const scrolledY = el.clientHeight + Math.abs(el.scrollTop);
                    endReached(el.scrollHeight, scrolledY);
                });
            }
            this._listeners.push(listener);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: InfiniteScrollComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.1", type: InfiniteScrollComponent, isStandalone: true, selector: "ngx-infinite-scroll", inputs: { scrollCont: { classPropertyName: "scrollCont", publicName: "scrollCont", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { loadNext: "loadNext" }, ngImport: i0, template: "<button\n  class=\"fallback-btn\"\n  (click)=\"onLoadNext()\"\n  aria-label=\"Load more products\"\n>\n  <ngx-icon size=\"lg\" name=\"Downloading\" />\n  <span>Load More</span>\n</button>\n", styles: [":host{display:flex;justify-content:center;margin-top:3rem}:host button{color:var(--color-quaternary);background-color:transparent;transition:color .3s ease;align-items:center;border:none;display:flex;font-weight:600}:host button ngx-icon{margin-right:.5rem}:host button:hover{color:var(--color-primary)}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "ngx-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: InfiniteScrollComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-infinite-scroll', imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"fallback-btn\"\n  (click)=\"onLoadNext()\"\n  aria-label=\"Load more products\"\n>\n  <ngx-icon size=\"lg\" name=\"Downloading\" />\n  <span>Load More</span>\n</button>\n", styles: [":host{display:flex;justify-content:center;margin-top:3rem}:host button{color:var(--color-quaternary);background-color:transparent;transition:color .3s ease;align-items:center;border:none;display:flex;font-weight:600}:host button ngx-icon{margin-right:.5rem}:host button:hover{color:var(--color-primary)}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { InfiniteScrollComponent };
//# sourceMappingURL=ngx-templates-shared-infinite-scroll.mjs.map
