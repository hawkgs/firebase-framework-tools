import { PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
/**
 * Bypasses the built-in HTML sanitization.
 * Used for rendering HTML from a source.
 *
 * Script tags are stripped in order to prevent XSS.
 */
export declare class SafeHtmlPipe implements PipeTransform {
    private _sanitizer;
    private _platformId;
    transform(html: string): SafeHtml;
    private _sanitizeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<SafeHtmlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SafeHtmlPipe, "safeHtml", true>;
}
