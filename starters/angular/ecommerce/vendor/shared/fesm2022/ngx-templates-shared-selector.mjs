import * as i0 from '@angular/core';
import { input, signal, OutputEmitterRef, HostBinding, ChangeDetectionStrategy, Component, model, contentChildren } from '@angular/core';

class SelectorItemComponent {
    constructor() {
        this.value = input.required();
        this.groupName = signal('');
        this.checked = signal(false);
        this.type = signal('rows');
        // We don't want to expose the changes as a component output.
        this.change = new OutputEmitterRef();
    }
    get isChecked() {
        return this.checked();
    }
    get isColumnsType() {
        return this.type() === 'columns';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SelectorItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "19.2.1", type: SelectorItemComponent, isStandalone: true, selector: "ngx-selector-item", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class.checked": "this.isChecked", "class.columns-type": "this.isColumnsType" } }, ngImport: i0, template: "<div class=\"input-cont\">\n  <input\n    type=\"radio\"\n    [name]=\"groupName()\"\n    [checked]=\"checked()\"\n    (change)=\"change.emit(value())\"\n  />\n  <div class=\"checkbox\"></div>\n</div>\n<div class=\"content\">\n  <ng-content />\n</div>\n", styles: [":host{position:relative;display:flex;align-items:center;border:1px solid var(--color-senary);color:var(--color-tertiary);border-radius:.25rem;padding:1rem .75rem;transition:border-color .3s ease}:host.columns-type{flex-direction:column-reverse;padding:.75rem}:host.columns-type .input-cont{margin:.5rem 0 0}:host.columns-type .content{text-align:center}:host.checked{border-color:var(--color-french-violet)}:host:hover{border-color:var(--color-quaternary)}:host .input-cont{margin:0 .5rem 0 0}:host .input-cont input{position:absolute;top:0;left:0;z-index:1;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}:host .input-cont .checkbox{width:16px;height:16px;border-radius:50%;border:1px solid var(--color-senary);box-sizing:border-box;display:flex;align-items:center;justify-content:center;transition:border-color .3s ease}:host .input-cont .checkbox:after{content:\"\";width:9.6px;height:9.6px;border-radius:50%;background-color:transparent;transition:background-color .3s ease}:host .input-cont input:checked+.checkbox{border-color:var(--color-french-violet)}:host .input-cont input:checked+.checkbox:after{background-color:var(--color-french-violet)}:host .content{flex:1;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SelectorItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-selector-item', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"input-cont\">\n  <input\n    type=\"radio\"\n    [name]=\"groupName()\"\n    [checked]=\"checked()\"\n    (change)=\"change.emit(value())\"\n  />\n  <div class=\"checkbox\"></div>\n</div>\n<div class=\"content\">\n  <ng-content />\n</div>\n", styles: [":host{position:relative;display:flex;align-items:center;border:1px solid var(--color-senary);color:var(--color-tertiary);border-radius:.25rem;padding:1rem .75rem;transition:border-color .3s ease}:host.columns-type{flex-direction:column-reverse;padding:.75rem}:host.columns-type .input-cont{margin:.5rem 0 0}:host.columns-type .content{text-align:center}:host.checked{border-color:var(--color-french-violet)}:host:hover{border-color:var(--color-quaternary)}:host .input-cont{margin:0 .5rem 0 0}:host .input-cont input{position:absolute;top:0;left:0;z-index:1;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}:host .input-cont .checkbox{width:16px;height:16px;border-radius:50%;border:1px solid var(--color-senary);box-sizing:border-box;display:flex;align-items:center;justify-content:center;transition:border-color .3s ease}:host .input-cont .checkbox:after{content:\"\";width:9.6px;height:9.6px;border-radius:50%;background-color:transparent;transition:background-color .3s ease}:host .input-cont input:checked+.checkbox{border-color:var(--color-french-violet)}:host .input-cont input:checked+.checkbox:after{background-color:var(--color-french-violet)}:host .content{flex:1;width:100%}\n"] }]
        }], propDecorators: { isChecked: [{
                type: HostBinding,
                args: ['class.checked']
            }], isColumnsType: [{
                type: HostBinding,
                args: ['class.columns-type']
            }] } });

class SelectorGroupComponent {
    constructor() {
        this.name = input.required();
        this.type = input('rows');
        this.value = model();
        this.selectorItems = contentChildren(SelectorItemComponent);
    }
    get isColumnsType() {
        return this.type() === 'columns';
    }
    ngAfterContentInit() {
        for (const item of this.selectorItems()) {
            item.groupName.set(this.name());
            item.type.set(this.type());
            item.change.subscribe((selected) => {
                this.value.set(selected);
                for (const item of this.selectorItems()) {
                    item.checked.set(item.value() === this.value());
                }
            });
            if (item.value() === this.value()) {
                item.checked.set(true);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SelectorGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "19.2.1", type: SelectorGroupComponent, isStandalone: true, selector: "ngx-selector-group", inputs: { name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: true, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange" }, host: { properties: { "class.columns-type": "this.isColumnsType" } }, queries: [{ propertyName: "selectorItems", predicate: SelectorItemComponent, isSignal: true }], ngImport: i0, template: "<ng-content />\n", styles: [":host{display:grid;grid-template-columns:repeat(1,1fr);gap:.5rem}:host.columns-type{grid-template-columns:repeat(2,1fr)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.1", ngImport: i0, type: SelectorGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-selector-group', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content />\n", styles: [":host{display:grid;grid-template-columns:repeat(1,1fr);gap:.5rem}:host.columns-type{grid-template-columns:repeat(2,1fr)}\n"] }]
        }], propDecorators: { isColumnsType: [{
                type: HostBinding,
                args: ['class.columns-type']
            }] } });

const SELECTOR_COMPONENTS = [
    SelectorGroupComponent,
    SelectorItemComponent,
];

/**
 * Generated bundle index. Do not edit.
 */

export { SELECTOR_COMPONENTS, SelectorGroupComponent, SelectorItemComponent };
//# sourceMappingURL=ngx-templates-shared-selector.mjs.map
