import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ViewEncapsulation, ChangeDetectionStrategy, Component } from '@angular/core';

/* eslint-disable @angular-eslint/no-host-metadata-property */
// Powered by Material Symbols
class IconComponent {
    constructor() {
        this.name = input.required();
        this.size = input('md');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.1", type: IconComponent, isStandalone: true, selector: "ngx-icon", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null } }, host: { classAttribute: "ngx-icon" }, ngImport: i0, template: `
    <svg class="svg" [ngClass]="[size()]">
      <use [attr.xlink:href]="'/assets/icons-sprite.svg#' + name()"></use>
    </svg>
  `, isInline: true, styles: [".ngx-icon{position:relative;display:block}.ngx-icon .svg{position:absolute;top:0;left:0;all:inherit;margin:initial;transform:initial;position:initial;top:initial;left:initial;right:initial;bottom:initial;border:initial;width:1.125rem;height:1.125rem;fill:var(--icon-color, currentColor);stroke:var(--icon-color, currentColor)}.ngx-icon .svg.sm{width:.875rem;height:.875rem}.ngx-icon .svg.md{width:1.125rem;height:1.125rem}.ngx-icon .svg.lg{width:1.25rem;height:1.25rem}.ngx-icon .svg.xlg{width:1.5rem;height:1.5rem}.ngx-icon .svg.xxlg{width:2rem;height:2rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-icon', imports: [CommonModule], template: `
    <svg class="svg" [ngClass]="[size()]">
      <use [attr.xlink:href]="'/assets/icons-sprite.svg#' + name()"></use>
    </svg>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'ngx-icon',
                    }, styles: [".ngx-icon{position:relative;display:block}.ngx-icon .svg{position:absolute;top:0;left:0;all:inherit;margin:initial;transform:initial;position:initial;top:initial;left:initial;right:initial;bottom:initial;border:initial;width:1.125rem;height:1.125rem;fill:var(--icon-color, currentColor);stroke:var(--icon-color, currentColor)}.ngx-icon .svg.sm{width:.875rem;height:.875rem}.ngx-icon .svg.md{width:1.125rem;height:1.125rem}.ngx-icon .svg.lg{width:1.25rem;height:1.25rem}.ngx-icon .svg.xlg{width:1.5rem;height:1.5rem}.ngx-icon .svg.xxlg{width:2rem;height:2rem}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { IconComponent };
//# sourceMappingURL=ngx-templates-shared-icon.mjs.map
