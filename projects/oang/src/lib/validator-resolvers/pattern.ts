import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ValidatorResolver, ValidatorResolverContext } from '../oang-engine';
import { ValidatorInterceptor } from '../validator-interceptor';

@Injectable()
export class PatternValidatorResolver implements ValidatorResolver {
    constructor(private interceptor: ValidatorInterceptor) { }
    resolve(context: ValidatorResolverContext): ValidatorFn {
        if (context.controlInfo.schema.pattern) {
            return this.interceptor.intercept('pattern', Validators.pattern(context.controlInfo.schema.pattern), context);
        }
    }
}
