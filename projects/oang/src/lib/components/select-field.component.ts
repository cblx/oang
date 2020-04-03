import { Component, Injectable } from '@angular/core';
import { OangField } from './field.component';
import { FieldComponentResolverContext, FieldComponentResolver, ComponentResolution } from '../oang-engine';
import { getRefSchema } from '../oang-helpers';

@Component({
    selector: 'oang-select-field',
    template: `
        <label for="{{field.ui.uid}}">
            {{field.ui.label}}
            <ng-container *ngIf="field.controlInfo.schema['x-isRequired']">*</ng-container>
        </label>
        <select 
            id="{{field.ui.uid}}"
            [formControl]="field.controlInfo.control">
            <option [ngValue]="null">{{field.ui.placeholder}}</option>
            <option [ngValue]="o.value" *ngFor="let o of options">
                {{o.text}}
            </option>
        </select>
        {{field.ui.errorMessages[0]}}
    `
})
export class SelectFieldComponent {
    //options: { text: string, value: any }[] = [];
    get options(){ return this.field.ui.options; }

    constructor(public field: OangField) {
        // const enumSchema = getRefSchema(this.field.controlInfo);
        // this.options = enumSchema.enum.map((en, i) => ({
        //     text: enumSchema['x-enum-varnames'] ? enumSchema['x-enum-varnames'][i] : en,
        //     value: en
        // }));
    }
}


@Injectable()
export class SelectFieldComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        // Condition 1.
        let refSchema = getRefSchema(context.controlInfo);

        // References an enum
        if (refSchema?.enum) {
            return { type: SelectFieldComponent }
        }
    }

}