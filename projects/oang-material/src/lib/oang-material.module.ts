import { NgModule } from '@angular/core';
import { OangModule } from '@cblx.br/oang';
import { OangMatInputFieldModule } from './input-field';
import { OangMatCheckboxFieldModule } from './checkbox-field';
import { OangMatSelectFieldModule } from './select-field/select-field.module';

@NgModule({
  imports: [
    OangModule,
    //OangMatInputFieldModule
  ],
  exports:[
    OangModule,
    OangMatCheckboxFieldModule,
    OangMatInputFieldModule,
    OangMatSelectFieldModule
  ]
})
export class OangMaterialModule {}
