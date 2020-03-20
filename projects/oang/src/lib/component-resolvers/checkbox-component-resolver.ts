import { FieldComponentResolver, FieldComponentResolverContext, ComponentResolution } from '../oang-engine';
import { Injectable } from '@angular/core';
import { CheckboxFieldComponent } from '../components/checkbox-field.component';

@Injectable()
export class CheckboxFieldComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        if (context.controlInfo.schema.type == 'boolean') {
            return { type: CheckboxFieldComponent }
        }
    }

}