import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { ValidatorInterceptor } from '../validator-interceptor';

@Injectable()
export class MaxValidatorResolver implements ValidatorResolver {
    constructor(private interceptor: ValidatorInterceptor) { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        let maximum = context.controlInfo.schema.maximum;
        if (maximum || maximum === 0) {
            return this.interceptor.intercept('maximum', Validators.max(maximum), context);
        }
    }
}
