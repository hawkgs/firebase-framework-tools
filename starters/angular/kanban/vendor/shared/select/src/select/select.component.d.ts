import { AfterContentInit } from '@angular/core';
import { Map } from 'immutable';
import { SelectOptionComponent } from '../select-option/select-option.component';
import * as i0 from "@angular/core";
export declare class SelectComponent implements AfterContentInit {
    private _doc;
    options: import("@angular/core").Signal<readonly SelectOptionComponent[]>;
    title: import("@angular/core").InputSignal<string | undefined>;
    disabled: import("@angular/core").InputSignal<boolean | undefined>;
    placeholder: import("@angular/core").InputSignal<string>;
    showOptions: import("@angular/core").WritableSignal<boolean>;
    selected: import("@angular/core").ModelSignal<string | null>;
    presentationTexts: import("@angular/core").WritableSignal<Map<string, string>>;
    ngAfterContentInit(): void;
    toggleOptions(e: Event): void;
    onDocumentClick(): void;
    onDocumentKeydown(e: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectComponent, "ngx-select", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "selected": { "alias": "selected"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; }, ["options"], ["*"], true, never>;
}
