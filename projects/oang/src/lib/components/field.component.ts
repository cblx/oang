import { Component, Input, Injector, ChangeDetectorRef } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { OangEngine, ControlInfo } from '../oang-engine';
import { ExtendedSchemaObject } from '../extended-schema-object';
import { InputFieldComponent } from './input-field.component';

@Component({
    selector: 'oang-field',
    template: `<ng-template [cdkPortalOutlet]="componentPortal"></ng-template>`
})
export class OangField {
    @Input() controlInfo: ControlInfo<any>;
    componentPortal: ComponentPortal<any>;

    get label() {
        let xtSchema: ExtendedSchemaObject = this.controlInfo.schema;
        return xtSchema['x-displayName'] || xtSchema.title || this.controlInfo.name;
    }

    get placeholder() {
        let xtSchema: ExtendedSchemaObject = this.controlInfo.schema;
        return xtSchema['x-placeholder'] || xtSchema.description || this.label;
    }

    get errorMessages() {
        let errors = this.controlInfo.control.errors;
        let errorMessages = [];

        for (let err in errors) {
            if(errors[err] === true){
                errorMessages.push(err);
            }else{
                errorMessages.push(errors[err]);
            }
        }
        return errorMessages;
    }

    constructor(
        private injector: Injector,
        private changeDetectorRef: ChangeDetectorRef,
        private oangEngine: OangEngine
    ) {

    }
    ngOnInit() {
        this.setComponent();
    }

    private setComponent() {
        let component = this._chooseComponent();
        let weakMap = new WeakMap();
        let portalInjector = new PortalInjector(this.injector, weakMap);
        this.componentPortal = new ComponentPortal(component.type, null, portalInjector);
        this.changeDetectorRef.detectChanges();
    }

    private _chooseComponent()/*: ComponentType<any>*/ {
        let resolution = this.oangEngine.getFieldComponentType(this.controlInfo) || { 
            // TODO: Change it for a default message like "No component defined"
            type: InputFieldComponent
        };
        return resolution;
    }
}

