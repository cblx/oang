import { Component, Injectable } from '@angular/core';
import { OangField, FieldComponentResolver, FieldComponentResolverContext, ComponentResolution } from '@cblx.br/oang';

@Component({
  selector: 'oang-mat-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css']
})
export class CheckboxFieldComponent {
  constructor(public field: OangField) { }
}

@Injectable()
export class CheckboxFieldComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        if (context.controlInfo.schema.type == 'boolean') {
            return { type: CheckboxFieldComponent };
        }
    }
}