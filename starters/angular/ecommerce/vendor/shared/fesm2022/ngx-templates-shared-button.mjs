import * as i0 from '@angular/core';
import { inject, Renderer2, ElementRef, input, ChangeDetectionStrategy, Component } from '@angular/core';

/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-selector */
class ButtonComponent {
    _renderer = inject(Renderer2);
    _elRef = inject(ElementRef);
    btnType = input.required();
    size = input('compact');
    ngOnInit() {
        const el = this._elRef.nativeElement;
        this._renderer.addClass(el, `${this.btnType()}-btn`);
        this._renderer.addClass(el, `${this.size()}-size-btn`);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.2", type: ButtonComponent, isStandalone: true, selector: "button[ngx-button]", inputs: { btnType: { classPropertyName: "btnType", publicName: "btnType", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, host: { classAttribute: "ngx-button" }, ngImport: i0, template: '<ng-content />', isInline: true, styles: [":host{font-weight:500;border-radius:.25rem;border:none;transition:color .3s ease;font-size:.875rem;padding:.5rem;cursor:pointer}:host.minimal-size-btn{font-size:.75rem;padding:.25rem .75rem;border-radius:.2rem}@media (max-width: 640px){:host.minimal-size-btn{font-size:1rem}}:host.large-size-btn{padding:.75rem 1rem;font-size:1rem}:host.primary-btn,:host.danger-btn{border:1px solid transparent;color:var(--color-bg);transition:background-color .3s ease,background-position .3s ease,opacity .3s ease}:host.primary-btn:not([disabled]):hover,:host.danger-btn:not([disabled]):hover{background-position-x:calc(100% + 1px)}:host.primary-btn[disabled],:host.danger-btn[disabled]{background:var(--color-quinary)}:host.primary-btn{background:var(--gradient-orange-to-violet);background-size:200%;background-position:50%}:host.secondary-btn{border:1px solid var(--color-senary);color:var(--color-tertiary);transition:border-color .3s ease,color .3s ease;background-color:var(--color-bg)}:host.secondary-btn:not([disabled]):hover{border-color:var(--color-french-violet)}:host.secondary-btn[disabled]{color:var(--color-quinary)}:host.danger-btn{background:var(--gradient-red-to-darkred);background-size:200%;background-position:50%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'button[ngx-button]', imports: [], template: '<ng-content />', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        class: 'ngx-button',
                    }, styles: [":host{font-weight:500;border-radius:.25rem;border:none;transition:color .3s ease;font-size:.875rem;padding:.5rem;cursor:pointer}:host.minimal-size-btn{font-size:.75rem;padding:.25rem .75rem;border-radius:.2rem}@media (max-width: 640px){:host.minimal-size-btn{font-size:1rem}}:host.large-size-btn{padding:.75rem 1rem;font-size:1rem}:host.primary-btn,:host.danger-btn{border:1px solid transparent;color:var(--color-bg);transition:background-color .3s ease,background-position .3s ease,opacity .3s ease}:host.primary-btn:not([disabled]):hover,:host.danger-btn:not([disabled]):hover{background-position-x:calc(100% + 1px)}:host.primary-btn[disabled],:host.danger-btn[disabled]{background:var(--color-quinary)}:host.primary-btn{background:var(--gradient-orange-to-violet);background-size:200%;background-position:50%}:host.secondary-btn{border:1px solid var(--color-senary);color:var(--color-tertiary);transition:border-color .3s ease,color .3s ease;background-color:var(--color-bg)}:host.secondary-btn:not([disabled]):hover{border-color:var(--color-french-violet)}:host.secondary-btn[disabled]{color:var(--color-quinary)}:host.danger-btn{background:var(--gradient-red-to-darkred);background-size:200%;background-position:50%}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonComponent };
//# sourceMappingURL=ngx-templates-shared-button.mjs.map
