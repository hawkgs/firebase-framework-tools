import { PipeTransform } from '@angular/core';
import { ThemeType } from '../theme.service';
import * as i0 from "@angular/core";
export declare class ThemeLabelPipe implements PipeTransform {
    transform(value: ThemeType): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeLabelPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ThemeLabelPipe, "themeLabel", true>;
}
