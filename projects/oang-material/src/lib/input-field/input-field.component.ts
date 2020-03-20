import { Component, Injectable } from '@angular/core';
import { OangField, InputFieldComponent, FieldComponentResolver, ComponentResolution, FieldComponentResolverContext } from '@cblx.br/oang';

@Component({
  selector: 'oang-mat-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class OangMatInputFieldComponent extends InputFieldComponent {
  constructor(public field: OangField) { 
    super(field);
  }
}

@Injectable()
export class OangMatInputFieldComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        if (context.controlInfo.schema.type != 'boolean') {
            return { type: OangMatInputFieldComponent };
        }
    }
}