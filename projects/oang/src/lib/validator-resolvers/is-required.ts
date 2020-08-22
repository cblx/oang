import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { ValidatorInterceptor } from '../validator-interceptor';

@Injectable()
export class IsRequiredValidatorResolver implements ValidatorResolver {
    constructor(private interceptor: ValidatorInterceptor) { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema['x-isRequired']) {
            return this.interceptor.intercept('required', Validators.required, context);
        }
    }
}
