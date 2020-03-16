import { Component } from '@angular/core';
import { OangField, FieldDefaultComponent } from '@cblx.br/oang';

@Component({
  selector: 'oang-mat-field-text',
  templateUrl: './field-text.component.html',
  styleUrls: ['./field-text.component.css']
})
export class FieldTextComponent extends FieldDefaultComponent {
  constructor(public field: OangField) { 
    super(field);
  }
}
