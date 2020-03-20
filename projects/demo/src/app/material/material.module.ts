import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExampleComponent } from './mat-example/mat-example.component';
import { OangMaterialModule } from 'projects/oang-material/src/public-api';

@NgModule({
  declarations: [MatExampleComponent],
  imports: [
    CommonModule,
    OangMaterialModule
  ],
  exports:[
    MatExampleComponent
  ],
  //providers: [MyComponentResolver]
})
export class MaterialModule {
  
}
