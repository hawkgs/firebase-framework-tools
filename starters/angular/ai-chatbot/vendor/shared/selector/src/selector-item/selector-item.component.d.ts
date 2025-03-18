import { OutputEmitterRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SelectorItemComponent {
    value: import("@angular/core").InputSignal<string>;
    groupName: import("@angular/core").WritableSignal<string>;
    checked: import("@angular/core").WritableSignal<boolean>;
    type: import("@angular/core").WritableSignal<"rows" | "columns">;
    change: OutputEmitterRef<string>;
    get isChecked(): boolean;
    get isColumnsType(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectorItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectorItemComponent, "ngx-selector-item", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
