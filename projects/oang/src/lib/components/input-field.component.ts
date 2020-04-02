import { Component, Injectable } from '@angular/core';
import { OangField } from './field.component';
import { FieldComponentResolverContext, FieldComponentResolver, ComponentResolution } from '../oang-engine';

@Component({
    selector: 'oang-input-field',
    template: `
        <label for="{{field.ui.uid}}">
            {{field.ui.label}}
            <ng-container *ngIf="field.controlInfo.schema['x-isRequired']">*</ng-container>
        </label>
        <input *ngIf="type != 'number'"
            id="{{field.ui.uid}}"
            [type]="type"
            [placeholder]="field.ui.placeholder" [formControl]="field.controlInfo.control"/>
        <!-- When using dynamic type attribute, value number would be converted to string -->
        <input *ngIf="type == 'number'"
            id="{{field.ui.uid}}"
            type="number"
            [placeholder]="field.ui.placeholder" [formControl]="field.controlInfo.control"/>
        {{field.ui.errorMessages[0]}}
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


@Injectable()
export class InputFieldComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        const type = context.controlInfo.schema.type;
        if (type == 'string' || type == 'number' || type == 'integer') {
            return { type: InputFieldComponent }
        }
    }

}