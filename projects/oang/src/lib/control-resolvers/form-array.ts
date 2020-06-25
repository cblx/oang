import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ControlResolver, ControlResolverContext } from '../oang-engine';

@Injectable()
export class FormArrayResolver implements ControlResolver {
    constructor(private formBuilder: FormBuilder) { }
    resolve(context: ControlResolverContext) {
        if (context.schema.type == 'array' && context.schema.items.$ref) {
            return this.formBuilder.array([]);
        }
    }
};
