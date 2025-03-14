import * as i0 from '@angular/core';
import { viewChild, input, output, signal, ChangeDetectionStrategy, Component, inject, contentChildren, model, HostListener } from '@angular/core';
import { IconComponent } from '@ngx-templates/shared/icon';
import { Map } from 'immutable';
import { DOCUMENT } from '@angular/common';

class SelectOptionComponent {
    button = viewChild.required('btn');
    value = input.required();
    optionSelect = output();
    presentationText = signal('');
    ngAfterContentInit() {
        this._extractPresentationText();
    }
    onSelect(e) {
        e.stopPropagation();
        this.optionSelect.emit(this.value());
    }
    // Note(Georgi): A rather unorthodox way to obtain the presentation text
    _extractPresentationText() {
        const btnEl = this.button().nativeElement;
        this.presentationText.set(btnEl.innerText);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: SelectOptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.2", type: SelectOptionComponent, isStandalone: true, selector: "ngx-select-option", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { optionSelect: "optionSelect" }, viewQueries: [{ propertyName: "button", first: true, predicate: ["btn"], descendants: true, isSignal: true }], ngImport: i0, template: "<button\n  #btn\n  (click)=\"onSelect($event)\"\n  [title]=\"'Select option: ' + presentationText()\"\n>\n  <ng-content />\n</button>\n", styles: [":host{display:block}:host button{display:block;background-color:transparent;color:var(--color-quaternary);width:100%;text-align:left;border:none;padding:.5rem .75rem;word-break:break-word;transition:background-color .2s ease,color .3s ease}:host button:hover,:host button:focus{background-color:var(--color-senary);color:var(--color-primary);outline:none}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: SelectOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-select-option', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  #btn\n  (click)=\"onSelect($event)\"\n  [title]=\"'Select option: ' + presentationText()\"\n>\n  <ng-content />\n</button>\n", styles: [":host{display:block}:host button{display:block;background-color:transparent;color:var(--color-quaternary);width:100%;text-align:left;border:none;padding:.5rem .75rem;word-break:break-word;transition:background-color .2s ease,color .3s ease}:host button:hover,:host button:focus{background-color:var(--color-senary);color:var(--color-primary);outline:none}\n"] }]
        }] });

class SelectComponent {
    _doc = inject(DOCUMENT);
    options = contentChildren(SelectOptionComponent);
    title = input();
    disabled = input();
    placeholder = input('');
    showOptions = signal(false);
    selected = model(null);
    presentationTexts = signal(Map());
    ngAfterContentInit() {
        const valueDuplicates = new Set();
        for (const opt of this.options()) {
            const value = opt.value();
            // Duplicates check
            if (valueDuplicates.has(value)) {
                throw new Error(`SelectComponent (ngx-select) detected two ngx-select-option instances with the same "${value}" value`);
            }
            valueDuplicates.add(value);
            this.presentationTexts.update((m) => m.set(opt.value(), opt.presentationText()));
            // Subscribe to the click/select events.
            // They are automatically disposed when
            // the components are destroyed.
            opt.optionSelect.subscribe((value) => {
                this.selected.set(value);
                this.showOptions.set(false);
            });
        }
    }
    toggleOptions(e) {
        if (this.disabled()) {
            return;
        }
        e.stopPropagation();
        this.showOptions.update((v) => !v);
    }
    onDocumentClick() {
        this.showOptions.set(false);
    }
    onDocumentKeydown(e) {
        if (this.showOptions() && ['ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.preventDefault();
            const options = this.options();
            const focusedIdx = options.findIndex((cmp) => cmp.button().nativeElement === this._doc.activeElement);
            let newIdx = focusedIdx + (e.key === 'ArrowDown' ? 1 : -1);
            newIdx = newIdx >= 0 ? newIdx % options.length : options.length - 1;
            options[newIdx].button().nativeElement.focus();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: SelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.2.2", type: SelectComponent, isStandalone: true, selector: "ngx-select", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, selected: { classPropertyName: "selected", publicName: "selected", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { selected: "selectedChange" }, host: { listeners: { "document:click": "onDocumentClick()", "document:keydown": "onDocumentKeydown($event)" } }, queries: [{ propertyName: "options", predicate: SelectOptionComponent, isSignal: true }], ngImport: i0, template: "<button\n  class=\"ngx-input-element\"\n  [class.expanded]=\"showOptions()\"\n  [class.disabled]=\"disabled()\"\n  (click)=\"toggleOptions($event)\"\n  [title]=\"\n    title() ? title() : (showOptions() ? 'Collapse' : 'Expand') + ' select'\n  \"\n>\n  <span>\n    @if (selected(); as selected) {\n      {{ presentationTexts().get(selected) }}\n    } @else {\n      {{ placeholder() || 'Select an option' }}\n    }\n  </span>\n  <ngx-icon name=\"ChevronRight\" />\n</button>\n@if (showOptions()) {\n  <div class=\"options\">\n    <ng-content />\n  </div>\n}\n", styles: [":host{position:relative;display:block;-webkit-user-select:none;user-select:none}:host .ngx-input-element{position:relative;padding-left:.75rem;padding-right:2rem;display:block;width:100%;text-align:left}:host .ngx-input-element ngx-icon{position:absolute;top:.5rem;right:.5rem;transform:rotate(90deg);transition:transform .3s ease;pointer-events:none}:host .ngx-input-element.expanded ngx-icon{transform:rotate(270deg)}:host .ngx-input-element.disabled{opacity:.7;pointer-events:none}:host .options{position:absolute;left:0;border:1px solid var(--color-senary);background-color:var(--color-bg);box-shadow:0 2px 20px #0000004d;border-radius:.25rem;width:100%;max-height:0;overflow:hidden;animation:expand .3s ease;animation-iteration-count:1;animation-fill-mode:forwards;box-sizing:border-box;margin-top:.25rem}@keyframes expand{0%{max-height:0}to{max-height:500px}}\n"], dependencies: [{ kind: "component", type: IconComponent, selector: "ngx-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: SelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-select', imports: [IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"ngx-input-element\"\n  [class.expanded]=\"showOptions()\"\n  [class.disabled]=\"disabled()\"\n  (click)=\"toggleOptions($event)\"\n  [title]=\"\n    title() ? title() : (showOptions() ? 'Collapse' : 'Expand') + ' select'\n  \"\n>\n  <span>\n    @if (selected(); as selected) {\n      {{ presentationTexts().get(selected) }}\n    } @else {\n      {{ placeholder() || 'Select an option' }}\n    }\n  </span>\n  <ngx-icon name=\"ChevronRight\" />\n</button>\n@if (showOptions()) {\n  <div class=\"options\">\n    <ng-content />\n  </div>\n}\n", styles: [":host{position:relative;display:block;-webkit-user-select:none;user-select:none}:host .ngx-input-element{position:relative;padding-left:.75rem;padding-right:2rem;display:block;width:100%;text-align:left}:host .ngx-input-element ngx-icon{position:absolute;top:.5rem;right:.5rem;transform:rotate(90deg);transition:transform .3s ease;pointer-events:none}:host .ngx-input-element.expanded ngx-icon{transform:rotate(270deg)}:host .ngx-input-element.disabled{opacity:.7;pointer-events:none}:host .options{position:absolute;left:0;border:1px solid var(--color-senary);background-color:var(--color-bg);box-shadow:0 2px 20px #0000004d;border-radius:.25rem;width:100%;max-height:0;overflow:hidden;animation:expand .3s ease;animation-iteration-count:1;animation-fill-mode:forwards;box-sizing:border-box;margin-top:.25rem}@keyframes expand{0%{max-height:0}to{max-height:500px}}\n"] }]
        }], propDecorators: { onDocumentClick: [{
                type: HostListener,
                args: ['document:click']
            }], onDocumentKeydown: [{
                type: HostListener,
                args: ['document:keydown', ['$event']]
            }] } });

const SELECT_COMPONENTS = [
    SelectComponent,
    SelectOptionComponent,
];

/**
 * Generated bundle index. Do not edit.
 */

export { SELECT_COMPONENTS, SelectComponent, SelectOptionComponent };
//# sourceMappingURL=ngx-templates-shared-select.mjs.map
