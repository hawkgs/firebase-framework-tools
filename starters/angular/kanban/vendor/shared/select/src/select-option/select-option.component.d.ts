import { AfterContentInit, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SelectOptionComponent implements AfterContentInit {
    button: import("@angular/core").Signal<ElementRef<any>>;
    value: import("@angular/core").InputSignal<string>;
    optionSelect: import("@angular/core").OutputEmitterRef<string>;
    presentationText: import("@angular/core").WritableSignal<string>;
    ngAfterContentInit(): void;
    onSelect(e: Event): void;
    private _extractPresentationText;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectOptionComponent, "ngx-select-option", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; }, { "optionSelect": "optionSelect"; }, never, ["*"], true, never>;
}
