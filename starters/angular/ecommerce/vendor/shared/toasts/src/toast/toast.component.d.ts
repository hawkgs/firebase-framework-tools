import { Toast } from '../toast';
import { ToastType } from '../types';
import * as i0 from "@angular/core";
export declare class ToastComponent {
    toast: import("@angular/core").InputSignal<Toast>;
    ToastType: typeof ToastType;
    TYPE_TO_CLASS: {
        default: string;
        notification: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastComponent, "ngx-toast", never, { "toast": { "alias": "toast"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
