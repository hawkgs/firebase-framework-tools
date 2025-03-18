import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
type ButtonType = 'primary' | 'secondary' | 'danger';
export declare class ButtonComponent implements OnInit {
    private _renderer;
    private _elRef;
    btnType: import("@angular/core").InputSignal<ButtonType>;
    size: import("@angular/core").InputSignal<"compact" | "large" | "minimal">;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "button[ngx-button]", never, { "btnType": { "alias": "btnType"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
export {};
