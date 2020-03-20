import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OangEngine, FormGroupInfo } from 'projects/oang/src/lib/oang-engine';
import { ExtendedSchemaObject } from 'projects/oang/src/lib/extended-schema-object';
import { MatExampleComponent } from './material/mat-example/mat-example.component';

const schemaExample: ExtendedSchemaObject = {
  "required": [
    "name",
    "email"
  ],
  "title": "Edit Profiles",
  "description": "Please provide all required data",
  "properties": {
    "name": {
      "x-displayName": "Name",
      "x-placeholder": "Type your name",
      "type": "string",
      "maxLength": 64,
      "x-validationMessages": {
        "required": "This field is required",
        "maxLength": "The max length is 64"
      }
    },
    "document": {
      "x-displayName": "Document",
      "pattern": "\\d{3}.\\d{3}",
      "x-validationMessages": {
        "pattern": "required format: 000.000"
      }
    },
    "email": {
      "x-displayName": "Email",
      "x-placeholder": "your@email",
      "type": "string",
      "format": "email",
      "x-validationMessages": {
        "required": "This field is required",
        "email": "invalid email"
      }
    },
    "birthday": {
      "x-displayName": "Day of birth",
      "x-placeholder": "Type your day of birth",
      "type": "string",
      "format": "date"
    },
    "nextAppointment": {
      "x-displayName": "Next appointment",
      "x-placeholder": "when is your next appointment?",
      "type": "string",
      "format": "date-time"
    },
    "score": {
      "x-displayName": "Score",
      "type": "integer",
      "minimum": 0,
      "maximum": 999999,
      "x-validationMessages": {
        "minimum": "Minimum is 0",
        "maximum": "Maximum is 999.999"
      }
    },
    "isActive":{
      "x-displayName": "Active",
      "type": "boolean"
    }
  }
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  currentSchema;
  schemaControl = this.formBuilder.control('');
  formGroupInfo: FormGroupInfo;
  err;

  @ViewChild(MatExampleComponent) matExample: MatExampleComponent;

  constructor(private formBuilder: FormBuilder, private oangEngine: OangEngine) {
 
  }

  ngOnInit(){
    this.schemaControl.valueChanges.subscribe(schema => {
      try {
        const schemaObj = JSON.parse(schema);
        localStorage.setItem('schema', schema);
        this.formGroupInfo = null;
        this.formGroupInfo = this.oangEngine.createForm(schemaObj);
        this.currentSchema = schemaObj;
      } catch (err) {
        this.err = err;
      }
    });
    let memory = localStorage.getItem('schema');
    if (memory === null || memory === undefined) {
      this.reset();
    } else {
      this.schemaControl.setValue(memory);
    }
  }

  submit() {
    alert('Valid:' + this.formGroupInfo.control.valid);
  }

  reset() {
    this.schemaControl.setValue(JSON.stringify(schemaExample, null, 2))
  }
}
