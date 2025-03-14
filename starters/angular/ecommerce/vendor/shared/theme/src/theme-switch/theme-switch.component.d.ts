import { IconName } from '@ngx-templates/shared/icon';
import { ThemeType } from '../theme.service';
import * as i0 from "@angular/core";
export declare class ThemeSwitchComponent {
    private _theme;
    currentTheme: import("@angular/core").Signal<ThemeType>;
    iconOnly: import("@angular/core").InputSignal<boolean>;
    THEME_TO_ICON: {
        light: IconName;
        dark: IconName;
        system: IconName;
    };
    onThemeSwitch(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ThemeSwitchComponent, "ngx-theme-switch", never, { "iconOnly": { "alias": "iconOnly"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
