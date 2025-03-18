import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class SwitchComponent implements ControlValueAccessor {
    on: import("@angular/core").ModelSignal<boolean>;
    disabled: import("@angular/core").WritableSignal<boolean>;
    title: import("@angular/core").InputSignal<string | undefined>;
    private _onChange?;
    private _onTouched?;
    onSwitchToggle(e: Event): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: (v: boolean) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState?(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SwitchComponent, "ngx-switch", never, { "on": { "alias": "on"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; }, { "on": "onChange"; }, never, never, true, never>;
}
