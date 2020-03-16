import { FieldComponentResolver, FieldComponentResolverContext, ComponentResolution } from '@cblx.br/oang';
import { FieldTextComponent } from './field-text.component';
import { Injectable } from "@angular/core";

@Injectable()
export class FieldTextComponentResolver implements FieldComponentResolver {
    resolve(context: FieldComponentResolverContext): ComponentResolution {
        return { type: FieldTextComponent };
    }
}