import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OangMatInputFieldComponent, OangMatInputFieldComponentResolver } from './input-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { OangModule, OangEngine } from '@cblx.br/oang';

@NgModule({
  declarations: [OangMatInputFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    OangModule,
    ReactiveFormsModule
  ],
  exports: [OangMatInputFieldComponent],
  providers:[OangMatInputFieldComponentResolver]
})
export class OangMatInputFieldModule {
  constructor(oangEngine: OangEngine){
    oangEngine.fieldComponentResolvers.splice(0, 0, OangMatInputFieldComponentResolver);
  }
}
