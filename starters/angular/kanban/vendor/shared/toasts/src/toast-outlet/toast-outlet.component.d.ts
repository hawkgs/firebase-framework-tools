import { ToastsService } from '../toasts.service';
import * as i0 from "@angular/core";
export declare class ToastOutletComponent {
    toasts: ToastsService;
    default: import("@angular/core").Signal<import("immutable").List<import("../toast").Toast>>;
    notifications: import("@angular/core").Signal<import("immutable").List<import("../toast").Toast>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastOutletComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastOutletComponent, "ngx-toast-outlet", never, {}, {}, never, never, true, never>;
}
