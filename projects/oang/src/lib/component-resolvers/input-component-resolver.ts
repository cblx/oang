import { FieldComponentResolver, FieldComponentResolverContext, ComponentResolution } from '../oang-engine';
import { Injectable } from '@angular/core';
import { InputFieldComponent } from '../components/input-field.component';

@Injectable()
export class InputFieldComponentResolver implements FieldComponentResolver{
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        return { type: InputFieldComponent }
    }

}