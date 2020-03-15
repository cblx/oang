import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ControlResolver } from '../oang-engine';

@Injectable()
export class DefaultControlResolver implements ControlResolver {
    constructor(private formBuilder: FormBuilder) {}
    resolve() {
        return this.formBuilder.control(null);
    }
};
