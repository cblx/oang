import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OangEngine, FormGroupInfo } from 'projects/oangui/src/lib/oang-engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  schemaControl = this.formBuilder.control('');
  formGroupInfo: FormGroupInfo;
  err;
  constructor(private formBuilder: FormBuilder, private oangEngine: OangEngine) {
    this.schemaControl.valueChanges.subscribe(schema => {
      try {
        this.formGroupInfo = null;
        this.formGroupInfo = oangEngine.createForm(JSON.parse(schema));
        localStorage.setItem('schema',schema);
      } catch (err) {
        this.err = err;
      }
    });
    this.schemaControl.setValue(localStorage.getItem('schema'));
  }

  submit(){
    alert('Valid:' + this.formGroupInfo.control.valid);
  }

}
