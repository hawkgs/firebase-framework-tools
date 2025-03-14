import { List } from 'immutable';
import { Toast } from './toast';
import { ToastConfig } from './types';
import * as i0 from "@angular/core";
/**
 * Provides a very simple interface for
 * creation of notification toasts.
 */
export declare class ToastsService {
    private _toasts;
    readonly value: import("@angular/core").Signal<List<Toast>>;
    create(text: string, config?: Partial<ToastConfig>): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastsService>;
}
