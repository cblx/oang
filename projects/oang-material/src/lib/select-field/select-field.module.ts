import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent, SelectFieldComponentResolver } from './select-field.component';
import { OangModule, OangEngine } from '@cblx.br/oang';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectFieldComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    OangModule
  ],
  providers: [SelectFieldComponentResolver]
})
export class OangMatSelectFieldModule { 
  constructor(oangEngine: OangEngine){
    oangEngine.fieldComponentResolvers.splice(0, 0, SelectFieldComponentResolver);
  }
}
