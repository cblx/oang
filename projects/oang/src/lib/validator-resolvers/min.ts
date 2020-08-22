import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { ValidatorInterceptor } from '../validator-interceptor';

@Injectable()
export class MinValidatorResolver implements ValidatorResolver {
    constructor(private interceptor: ValidatorInterceptor) { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        let minimum = context.controlInfo.schema.minimum;
        if (minimum || minimum === 0) {
            return this.interceptor.intercept('minimum', Validators.min(minimum), context);
        }
    }
}
