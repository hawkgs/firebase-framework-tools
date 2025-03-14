import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component, signal, Injectable, inject, computed } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@ngx-templates/shared/icon';
import { List } from 'immutable';

var ToastType;
(function (ToastType) {
    /**
     * Standard small toast that appears at the top of the viewport.
     */
    ToastType["Default"] = "default";
    /**
     * A notification-like toast that is rendered at the bottom right
     * portion of the viewport.
     */
    ToastType["Notification"] = "notification";
})(ToastType || (ToastType = {}));

const TYPE_TO_CLASS = {
    default: 'def-type',
    notification: 'ntf-type',
};
class ToastComponent {
    constructor() {
        this.toast = input.required();
        this.ToastType = ToastType;
        this.TYPE_TO_CLASS = TYPE_TO_CLASS;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ToastComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.1", type: ToastComponent, isStandalone: true, selector: "ngx-toast", inputs: { toast: { classPropertyName: "toast", publicName: "toast", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<button\n  (click)=\"toast().destroy()\"\n  title=\"Close toast\"\n  [ngClass]=\"TYPE_TO_CLASS[toast().config.type]\"\n>\n  @if (toast().config.type === ToastType.Notification && toast().config.icon) {\n    <ngx-icon [name]=\"toast().config.icon!\" size=\"lg\" />\n  }\n  <span>{{ toast().name }}</span>\n</button>\n", styles: [":host button.ntf-type{font-size:.875rem;font-style:normal;line-height:1rem}@media (max-width: 640px){:host button.ntf-type{font-size:1rem}}:host button.def-type{font-size:.75rem}:host{display:block}:host button{display:block;border:none;margin-bottom:.5rem}:host button.def-type{padding:.25rem .875rem;border-radius:.25rem;background:var(--gradient-pink-to-violet);box-shadow:0 2px 5px #0003;color:var(--white);animation:slide-down .3s ease;animation-iteration-count:1;animation-fill-mode:forwards}:host button.ntf-type{padding:.75rem 1rem;border-radius:.25rem;max-width:250px;text-align:left;color:var(--color-electric-lavander);background-color:var(--color-septenary);border:1px solid var(--color-french-violet);box-shadow:0 2px 2px #0000001a;animation:slide-right .3s ease;animation-iteration-count:1;animation-fill-mode:forwards;display:flex;align-items:center;line-height:1.25rem}:host button.ntf-type ngx-icon{margin-right:.75rem}@keyframes slide-down{0%{opacity:0;transform:translateY(0)}to{opacity:1;transform:translateY(4.5rem)}}@keyframes slide-right{0%{opacity:0;transform:translate(0)}to{opacity:1;transform:translate(1.5rem)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: IconComponent, selector: "ngx-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ToastComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-toast', imports: [CommonModule, IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  (click)=\"toast().destroy()\"\n  title=\"Close toast\"\n  [ngClass]=\"TYPE_TO_CLASS[toast().config.type]\"\n>\n  @if (toast().config.type === ToastType.Notification && toast().config.icon) {\n    <ngx-icon [name]=\"toast().config.icon!\" size=\"lg\" />\n  }\n  <span>{{ toast().name }}</span>\n</button>\n", styles: [":host button.ntf-type{font-size:.875rem;font-style:normal;line-height:1rem}@media (max-width: 640px){:host button.ntf-type{font-size:1rem}}:host button.def-type{font-size:.75rem}:host{display:block}:host button{display:block;border:none;margin-bottom:.5rem}:host button.def-type{padding:.25rem .875rem;border-radius:.25rem;background:var(--gradient-pink-to-violet);box-shadow:0 2px 5px #0003;color:var(--white);animation:slide-down .3s ease;animation-iteration-count:1;animation-fill-mode:forwards}:host button.ntf-type{padding:.75rem 1rem;border-radius:.25rem;max-width:250px;text-align:left;color:var(--color-electric-lavander);background-color:var(--color-septenary);border:1px solid var(--color-french-violet);box-shadow:0 2px 2px #0000001a;animation:slide-right .3s ease;animation-iteration-count:1;animation-fill-mode:forwards;display:flex;align-items:center;line-height:1.25rem}:host button.ntf-type ngx-icon{margin-right:.75rem}@keyframes slide-down{0%{opacity:0;transform:translateY(0)}to{opacity:1;transform:translateY(4.5rem)}}@keyframes slide-right{0%{opacity:0;transform:translate(0)}to{opacity:1;transform:translate(1.5rem)}}\n"] }]
        }] });

const DEFAULT_CFG = {
    ttl: 1000,
    type: ToastType.Default,
};
/**
 * Toast item
 */
class Toast {
    constructor(name, _list, config) {
        this.name = name;
        this._list = _list;
        this.createdAt = new Date().getTime();
        this.destroyPromise = new Promise((res) => {
            this._destroyResolver = res;
        });
        this.config = { ...DEFAULT_CFG, ...config };
        this._destroyTimeout = setTimeout(() => this.destroy(), this.config.ttl);
    }
    /**
     * Remove the toast from the list (i.e. the DOM)
     */
    destroy() {
        if (this._destroyTimeout) {
            clearTimeout(this._destroyTimeout);
        }
        const list = this._list();
        const idx = list.findIndex((t) => t === this);
        this._list.update((l) => l.remove(idx));
        this._destroyResolver();
    }
}

/**
 * Provides a very simple interface for
 * creation of notification toasts.
 */
class ToastsService {
    constructor() {
        this._toasts = signal(List([]));
        this.value = this._toasts.asReadonly();
    }
    create(text, config) {
        const toast = new Toast(text, this._toasts, config);
        this._toasts.update((l) => l.push(toast));
        return toast.destroyPromise;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ToastsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ToastsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ToastsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class ToastOutletComponent {
    constructor() {
        this.toasts = inject(ToastsService);
        this.default = computed(() => this.toasts.value().filter((t) => t.config.type === ToastType.Default));
        this.notifications = computed(() => this.toasts.value().filter((t) => t.config.type === ToastType.Notification));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ToastOutletComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.1", type: ToastOutletComponent, isStandalone: true, selector: "ngx-toast-outlet", ngImport: i0, template: "<div class=\"outlet default\">\n  @for (toast of default(); track toast.createdAt) {\n    <ngx-toast [toast]=\"toast\" />\n  }\n</div>\n<div class=\"outlet notifications\">\n  @for (toast of notifications(); track toast.createdAt) {\n    <ngx-toast [toast]=\"toast\" />\n  }\n</div>\n", styles: [":host .outlet{position:fixed;width:100%;height:0}:host .outlet.default{top:0;left:0;display:flex;flex-direction:column;align-items:center}:host .outlet.notifications{bottom:16px;left:0;display:flex;flex-direction:column-reverse;align-items:flex-start}\n"], dependencies: [{ kind: "component", type: ToastComponent, selector: "ngx-toast", inputs: ["toast"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: ToastOutletComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-toast-outlet', imports: [ToastComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"outlet default\">\n  @for (toast of default(); track toast.createdAt) {\n    <ngx-toast [toast]=\"toast\" />\n  }\n</div>\n<div class=\"outlet notifications\">\n  @for (toast of notifications(); track toast.createdAt) {\n    <ngx-toast [toast]=\"toast\" />\n  }\n</div>\n", styles: [":host .outlet{position:fixed;width:100%;height:0}:host .outlet.default{top:0;left:0;display:flex;flex-direction:column;align-items:center}:host .outlet.notifications{bottom:16px;left:0;display:flex;flex-direction:column-reverse;align-items:flex-start}\n"] }]
        }] });

const TOASTS_COMPONENTS = [ToastOutletComponent];

/**
 * Generated bundle index. Do not edit.
 */

export { TOASTS_COMPONENTS, ToastOutletComponent, ToastType, ToastsService };
//# sourceMappingURL=ngx-templates-shared-toasts.mjs.map
