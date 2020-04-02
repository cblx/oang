import { Component, Injectable } from '@angular/core';
import { SelectFieldComponent as SelectFieldComponentBase, OangField, FieldComponentResolver, ComponentResolution, FieldComponentResolverContext, getRefSchema } from '@cblx.br/oang';

@Component({
  selector: 'lib-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent extends SelectFieldComponentBase {
  constructor(public field: OangField) {
    super(field);
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