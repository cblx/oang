import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxFieldComponent, CheckboxFieldComponentResolver } from './checkbox-field.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { OangModule, OangEngine } from '@cblx.br/oang';

@NgModule({
  declarations: [CheckboxFieldComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    OangModule,
    ReactiveFormsModule
  ],
  exports: [CheckboxFieldComponent],
  providers:[CheckboxFieldComponentResolver]
})
export class OangMatCheckboxFieldModule {
  constructor(oangEngine: OangEngine){
    oangEngine.fieldComponentResolvers.splice(0, 0, CheckboxFieldComponentResolver);
  }
}
