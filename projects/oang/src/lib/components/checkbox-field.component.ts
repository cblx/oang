import { Component } from '@angular/core';
import { OangField } from './field.component';

@Component({
    selector: 'oang-checkbox-field',
    template: `
        <input type="checkbox">
        <label>{{field.label}}</label>
        {{field.errorMessages[0]}}
    `
})
export class CheckboxFieldComponent {
    constructor(public field: OangField) { }
}