import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OangMatCheckboxFieldComponent, OangMatCheckboxFieldComponentResolver } from './checkbox-field.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { OangModule, OangEngine } from '@cblx.br/oang';

@NgModule({
  declarations: [OangMatCheckboxFieldComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    OangModule,
    ReactiveFormsModule
  ],
  exports: [OangMatCheckboxFieldComponent],
  providers:[OangMatCheckboxFieldComponentResolver]
})
export class OangMatCheckboxFieldModule {
  constructor(oangEngine: OangEngine){
    oangEngine.fieldComponentResolvers.splice(0, 0, OangMatCheckboxFieldComponentResolver);
  }
}
