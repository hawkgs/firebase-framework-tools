import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

class AppLogoComponent {
    constructor() {
        this.text = input.required();
        this.routerLink = input('');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: AppLogoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.1", type: AppLogoComponent, isStandalone: true, selector: "ngx-app-logo", inputs: { text: { classPropertyName: "text", publicName: "text", isSignal: true, isRequired: true, transformFunction: null }, routerLink: { classPropertyName: "routerLink", publicName: "routerLink", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<ng-template #content>\n  <div class=\"ng-logo\"></div>\n  <span class=\"text\">{{ text() }}</span>\n</ng-template>\n\n@if (routerLink()) {\n  <a [routerLink]=\"routerLink()\" class=\"logo\" aria-label=\"Logo - Home page\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n} @else {\n  <div class=\"logo\" aria-label=\"Logo\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </div>\n}\n", styles: [":host{display:block}:host .logo{display:flex;align-items:center;font-size:24px;font-weight:500;text-decoration:none;-webkit-user-select:none;user-select:none}:host .logo .ng-logo{background:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 223 236\">%0A  <g clip-path=\"url(%23a)\">%0A    <path fill=\"url(%23b)\" d=\"m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z\"></path>%0A    <path fill=\"url(%23c)\" d=\"m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z\"></path>%0A  </g>%0A  <defs >%0A    <linearGradient id=\"b\" x1=\"49.009\" x2=\"225.829\" y1=\"213.75\" y2=\"129.722\" gradientUnits=\"userSpaceOnUse\">%0A      <stop stop-color=\"%23E40035\"></stop>%0A      <stop offset=\".24\" stop-color=\"%23F60A48\"></stop>%0A      <stop offset=\".352\" stop-color=\"%23F20755\"></stop>%0A      <stop offset=\".494\" stop-color=\"%23DC087D\"></stop>%0A      <stop offset=\".745\" stop-color=\"%239717E7\"></stop>%0A      <stop offset=\"1\" stop-color=\"%236C00F5\"></stop>%0A    </linearGradient>%0A    <linearGradient id=\"c\" x1=\"41.025\" x2=\"156.741\" y1=\"28.344\" y2=\"160.344\" gradientUnits=\"userSpaceOnUse\">%0A      <stop stop-color=\"%23FF31D9\"></stop>%0A      <stop offset=\"1\" stop-color=\"%23FF5BE1\" stop-opacity=\"0\"></stop>%0A    </linearGradient>%0A    <clipPath id=\"a\">%0A      <path fill=\"%23fff\" d=\"M0 0h223v236H0z\"></path>%0A    </clipPath>%0A  </defs>%0A</svg>%0A') no-repeat;width:30px;height:32px;margin-right:12px}:host .logo .text{background:var(--gradient-magenta-to-light-purple);-webkit-background-clip:text;background-size:140% 140%;background-clip:text;color:transparent;transition:background-position-x .5s ease}:host .logo:hover .text{background-position-x:80%}\n"], dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: AppLogoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-app-logo', imports: [RouterLink, CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #content>\n  <div class=\"ng-logo\"></div>\n  <span class=\"text\">{{ text() }}</span>\n</ng-template>\n\n@if (routerLink()) {\n  <a [routerLink]=\"routerLink()\" class=\"logo\" aria-label=\"Logo - Home page\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </a>\n} @else {\n  <div class=\"logo\" aria-label=\"Logo\">\n    <ng-container *ngTemplateOutlet=\"content\" />\n  </div>\n}\n", styles: [":host{display:block}:host .logo{display:flex;align-items:center;font-size:24px;font-weight:500;text-decoration:none;-webkit-user-select:none;user-select:none}:host .logo .ng-logo{background:url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 223 236\">%0A  <g clip-path=\"url(%23a)\">%0A    <path fill=\"url(%23b)\" d=\"m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z\"></path>%0A    <path fill=\"url(%23c)\" d=\"m222.077 39.192-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z\"></path>%0A  </g>%0A  <defs >%0A    <linearGradient id=\"b\" x1=\"49.009\" x2=\"225.829\" y1=\"213.75\" y2=\"129.722\" gradientUnits=\"userSpaceOnUse\">%0A      <stop stop-color=\"%23E40035\"></stop>%0A      <stop offset=\".24\" stop-color=\"%23F60A48\"></stop>%0A      <stop offset=\".352\" stop-color=\"%23F20755\"></stop>%0A      <stop offset=\".494\" stop-color=\"%23DC087D\"></stop>%0A      <stop offset=\".745\" stop-color=\"%239717E7\"></stop>%0A      <stop offset=\"1\" stop-color=\"%236C00F5\"></stop>%0A    </linearGradient>%0A    <linearGradient id=\"c\" x1=\"41.025\" x2=\"156.741\" y1=\"28.344\" y2=\"160.344\" gradientUnits=\"userSpaceOnUse\">%0A      <stop stop-color=\"%23FF31D9\"></stop>%0A      <stop offset=\"1\" stop-color=\"%23FF5BE1\" stop-opacity=\"0\"></stop>%0A    </linearGradient>%0A    <clipPath id=\"a\">%0A      <path fill=\"%23fff\" d=\"M0 0h223v236H0z\"></path>%0A    </clipPath>%0A  </defs>%0A</svg>%0A') no-repeat;width:30px;height:32px;margin-right:12px}:host .logo .text{background:var(--gradient-magenta-to-light-purple);-webkit-background-clip:text;background-size:140% 140%;background-clip:text;color:transparent;transition:background-position-x .5s ease}:host .logo:hover .text{background-position-x:80%}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AppLogoComponent };
//# sourceMappingURL=ngx-templates-shared-app-logo.mjs.map
