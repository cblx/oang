import { Component, Input, Injector, ChangeDetectorRef } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { OangEngine, ControlInfo } from '../oang-engine';
import { ExtendedSchemaObject } from '../extended-schema-object';

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

    get prompt() {
        let xtSchema: ExtendedSchemaObject = this.controlInfo.schema;
        return xtSchema['x-prompt'] || xtSchema.description || this.label;
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
        //weakMap.set(METADATA_CONTROL, this.control);
        //weakMap.set(FIELD_COMPONENT_DATA, component.data);
        let portalInjector = new PortalInjector(this.injector, weakMap);
        this.componentPortal = new ComponentPortal(component.type, null, portalInjector);
        this.changeDetectorRef.detectChanges();
    }

    private _chooseComponent()/*: ComponentType<any>*/ {
        let resolution = this.oangEngine.getFieldComponentType(this.controlInfo) || { type: FieldDefaultComponent };
        //this.chooseComponent.emit({ control: this.control, resolution });
        return resolution;
    }

    // getErrorMessage(){
    //     let errors = this.controlInfo.control.errors;
    //     let firstError = Object.getOwnPropertyNames(errors)[0];

    //     let validationErrors = this.schema['x-validationErrors'];
    //     if(validationErrors && (firstError in validationErrors)){
    //       return validationErrors[firstError];
    //     }

    //     return firstError;

    //     // Return error keu name
    //     // if(errors[firstError] === true){
    //     //   return firstError;
    //     // }

    //     // // Return error message (string)
    //     // return errors[firstError];
    //   }
}


@Component({
    selector: 'oang-field-default',
    template: `
        <label>
            {{field.label}}
            <ng-container *ngIf="field.controlInfo.schema['x-isRequired']">*</ng-container>
        </label>
        <input 
            [type]="type"
            [placeholder]="field.prompt" [formControl]="field.controlInfo.control"/>
        {{field.errorMessages[0]}}
    `
})
export class FieldDefaultComponent {
    get type() {
        switch (this.field.controlInfo?.schema?.type) {
            case 'integer':
                switch (this.field.controlInfo?.schema?.format) {
                    default: return "number";
                }
            case 'string':
                switch (this.field.controlInfo?.schema?.format) {
                    case "date": return "date";
                    case "date-time": return "datetime-local";
                    default: return "text";
                }
        }
    }

    get step() {
        switch (this.field.controlInfo?.schema?.type) {
            case 'integer':
                switch (this.field.controlInfo?.schema?.format) {
                    default: return 1;
                }
            default: return undefined;
        }
    }
    constructor(public field: OangField) { }
}