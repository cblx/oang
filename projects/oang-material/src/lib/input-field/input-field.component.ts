import { Component, Injectable } from '@angular/core';
import { OangField, InputFieldComponent as Base, FieldComponentResolver, ComponentResolution, FieldComponentResolverContext } from '@cblx.br/oang';

@Component({
  selector: 'oang-mat-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent extends Base {
  constructor(public field: OangField) {
    super(field);
  }
}

@Injectable()
export class InputFieldComponentResolver implements FieldComponentResolver {
  resolve(context: FieldComponentResolverContext): ComponentResolution {
    //if (context.controlInfo.schema.type != 'boolean') {
    const type = context.controlInfo.schema.type;
    if (type == 'string' || type == 'number' || type == 'integer') {
      return { type: InputFieldComponent };
    }
  }
}