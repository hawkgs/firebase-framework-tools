import * as i0 from "@angular/core";
export declare class ModalOutletComponent {
    private _doc;
    private _modalService;
    private _renderer;
    modals: import("@angular/core").Signal<import("immutable").List<import("../types").Modal<any, any>>>;
    constructor();
    closeCurrentVisibleModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalOutletComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalOutletComponent, "ngx-modal-outlet", never, {}, {}, never, never, true, never>;
}
