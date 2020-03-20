import { Component } from '@angular/core';
import { OangField } from './field.component';

@Component({
    selector: 'oang-input-field',
    template: `
        <label>
            {{field.label}}
            <ng-container *ngIf="field.controlInfo.schema['x-isRequired']">*</ng-container>
        </label>
        <input 
            [type]="type"
            [placeholder]="field.placeholder" [formControl]="field.controlInfo.control"/>
        {{field.errorMessages[0]}}
    `
})
export class InputFieldComponent {
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