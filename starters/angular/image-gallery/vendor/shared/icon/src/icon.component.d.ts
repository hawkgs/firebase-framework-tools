import * as i0 from "@angular/core";
export type IconName = 'Angular' | 'Cart' | 'LightMode' | 'DarkMode' | 'Routine' | 'Search' | 'Downloading' | 'ChevronRight' | 'Delete' | 'NoPhoto' | 'Close' | 'ArrowDown' | 'Download' | 'Link' | 'Lightbulb' | 'Add' | 'MoreVert' | 'Edit' | 'Menu' | 'Send' | 'Stop' | 'Chat' | 'SmartToy' | 'Face' | 'Info';
export type IconSize = 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg';
export declare class IconComponent {
    name: import("@angular/core").InputSignal<IconName>;
    size: import("@angular/core").InputSignal<IconSize>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "ngx-icon", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
