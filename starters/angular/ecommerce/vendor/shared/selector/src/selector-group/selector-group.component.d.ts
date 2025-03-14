import { AfterContentInit } from '@angular/core';
import { SelectorItemComponent } from '../selector-item/selector-item.component';
import * as i0 from "@angular/core";
export declare class SelectorGroupComponent implements AfterContentInit {
    name: import("@angular/core").InputSignal<string>;
    type: import("@angular/core").InputSignal<"rows" | "columns">;
    value: import("@angular/core").ModelSignal<string | undefined>;
    selectorItems: import("@angular/core").Signal<readonly SelectorItemComponent[]>;
    get isColumnsType(): boolean;
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectorGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectorGroupComponent, "ngx-selector-group", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, ["selectorItems"], ["*"], true, never>;
}
