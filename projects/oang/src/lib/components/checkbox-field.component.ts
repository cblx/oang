import { Component, Injectable } from '@angular/core';
import { OangField } from './field.component';
import { FieldComponentResolver, ComponentResolution, FieldComponentResolverContext } from '../oang-engine';

@Component({
    selector: 'oang-checkbox-field',
    template: `
        <input id="{{field.uid}}" type="checkbox">
        <label for="{{field.uid}}">{{field.label}}</label>
        {{field.errorMessages[0]}}
    `
})
export class CheckboxFieldComponent {
    constructor(public field: OangField) { }
}


@Injectable()
export class CheckboxFieldComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        if (context.controlInfo.schema.type == 'boolean') {
            return { type: CheckboxFieldComponent }
        }
    }

}