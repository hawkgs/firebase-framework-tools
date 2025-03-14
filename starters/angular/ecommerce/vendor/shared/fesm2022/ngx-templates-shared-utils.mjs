import { isPlatformBrowser } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, PLATFORM_ID, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Drop ?, =, & signs from the query parameter value
// and then replace spaces with a plus
const filterParamValue = (paramVal) => paramVal.replace(/\?|=|\$|&/g, '').replace(/\s/g, '+');
/**
 * Builds a query parameter string by a provided object.
 *
 * @param params An object with the query params;
 * @returns
 */
function buildQueryParamsString(params) {
    if (!params) {
        return '';
    }
    const paramParts = [];
    for (const key in params) {
        if (!params[key]) {
            continue;
        }
        const value = params[key];
        let processedValue = value;
        if (typeof params[key] === 'string') {
            processedValue = filterParamValue(params[key]);
        }
        else if (params[key] instanceof Array) {
            processedValue = params[key].join(',');
        }
        paramParts.push(`${key}=${processedValue}`);
    }
    return '?' + paramParts.join('&');
}

/**
 * Bypasses the built-in HTML sanitization.
 * Used for rendering HTML from a source.
 *
 * Script tags are stripped in order to prevent XSS.
 */
class SafeHtmlPipe {
    constructor() {
        this._sanitizer = inject(DomSanitizer);
        this._platformId = inject(PLATFORM_ID);
    }
    transform(html) {
        const sanitized = this._sanitizeHtml(html);
        return this._sanitizer.bypassSecurityTrustHtml(sanitized);
    }
    _sanitizeHtml(html) {
        if (!isPlatformBrowser(this._platformId)) {
            return '';
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const scriptTags = doc.querySelectorAll('script');
        scriptTags.forEach((s) => s.remove());
        return doc.body.innerHTML;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SafeHtmlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "19.2.1", ngImport: i0, type: SafeHtmlPipe, isStandalone: true, name: "safeHtml" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SafeHtmlPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'safeHtml',
                }]
        }] });

/**
 * Generate a short UUID.
 *
 * WARNING: Use only for mock data.
 *
 * @returns UUID
 */
function generateShortUUID() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let uuid = '';
    for (let i = 0; i < 8; i++) {
        uuid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uuid;
}

/**
 * Generated bundle index. Do not edit.
 */

export { SafeHtmlPipe, buildQueryParamsString, generateShortUUID };
//# sourceMappingURL=ngx-templates-shared-utils.mjs.map
