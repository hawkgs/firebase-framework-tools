import { InjectionToken } from '@angular/core';
import { DropGridComponent } from './drop-grid.component';
import * as i0 from "@angular/core";
export declare const DROP_GRID_GROUP: InjectionToken<Set<DropGridComponent>>;
/**
 * Drop grid group host directive.
 *
 * Groups are NOT supported on a mobile.
 */
export declare class DropGridGroupDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DropGridGroupDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DropGridGroupDirective, "[ngxDropGridGroup]", never, {}, {}, never, never, true, never>;
}
