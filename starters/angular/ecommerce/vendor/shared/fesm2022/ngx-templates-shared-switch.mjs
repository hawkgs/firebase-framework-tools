import * as i0 from '@angular/core';
import { model, signal, input, forwardRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class SwitchComponent {
    constructor() {
        this.on = model(false);
        this.disabled = signal(false);
        this.title = input();
    }
    onSwitchToggle(e) {
        const checkbox = e.target;
        const checked = checkbox.checked;
        this.writeValue(checked);
        if (this._onChange && this._onTouched) {
            this._onChange(checked);
            this._onTouched();
        }
    }
    writeValue(value) {
        this.on.set(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled.set(isDisabled);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.1", type: SwitchComponent, isStandalone: true, selector: "ngx-switch", inputs: { on: { classPropertyName: "on", publicName: "on", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { on: "onChange" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SwitchComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<input\n  type=\"checkbox\"\n  [checked]=\"on()\"\n  (change)=\"onSwitchToggle($event)\"\n  [attr.title]=\"title() ? title() : null\"\n/>\n<div class=\"switch\"></div>\n", styles: [":host{position:relative;display:inline-block;width:44px;height:24px;border-radius:25px;overflow:hidden}:host input{position:absolute;width:inherit;height:inherit;top:0;left:0;opacity:0;margin:0;cursor:pointer}:host .switch{position:absolute;background:var(--color-quinary);inset:0;pointer-events:none}:host .switch:after{content:\"\";position:absolute;width:20px;height:20px;border-radius:50%;top:2px;left:2px;background-color:var(--color-bg);transition:transform .2s ease}:host input:checked+.switch{background:var(--gradient-pink-to-violet)}:host input:checked+.switch:after{transform:translate(20px)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SwitchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-switch', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SwitchComponent),
                            multi: true,
                        },
                    ], template: "<input\n  type=\"checkbox\"\n  [checked]=\"on()\"\n  (change)=\"onSwitchToggle($event)\"\n  [attr.title]=\"title() ? title() : null\"\n/>\n<div class=\"switch\"></div>\n", styles: [":host{position:relative;display:inline-block;width:44px;height:24px;border-radius:25px;overflow:hidden}:host input{position:absolute;width:inherit;height:inherit;top:0;left:0;opacity:0;margin:0;cursor:pointer}:host .switch{position:absolute;background:var(--color-quinary);inset:0;pointer-events:none}:host .switch:after{content:\"\";position:absolute;width:20px;height:20px;border-radius:50%;top:2px;left:2px;background-color:var(--color-bg);transition:transform .2s ease}:host input:checked+.switch{background:var(--gradient-pink-to-violet)}:host input:checked+.switch:after{transform:translate(20px)}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { SwitchComponent };
//# sourceMappingURL=ngx-templates-shared-switch.mjs.map
