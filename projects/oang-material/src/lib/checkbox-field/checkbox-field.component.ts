import { Component, Injectable } from '@angular/core';
import { OangField, FieldComponentResolver, FieldComponentResolverContext, ComponentResolution } from '@cblx.br/oang';

@Component({
  selector: 'oang-mat-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css']
})
export class OangMatCheckboxFieldComponent {
  constructor(public field: OangField) { }
}

@Injectable()
export class OangMatCheckboxFieldComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        if (context.controlInfo.schema.type == 'boolean') {
            return { type: OangMatCheckboxFieldComponent };
        }
    }
}