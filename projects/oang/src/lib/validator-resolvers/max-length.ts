import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { ValidatorInterceptor } from '../validator-interceptor';

@Injectable()
export class MaxLengthValidatorResolver implements ValidatorResolver {
    constructor(private interceptor: ValidatorInterceptor) { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema.maxLength) {
            return this.interceptor.intercept('maxLength', Validators.maxLength(context.controlInfo.schema.maxLength), context);
        }
    }
}
