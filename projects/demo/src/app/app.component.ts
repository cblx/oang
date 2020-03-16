import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OangEngine, FormGroupInfo } from 'projects/oangui/src/lib/oang-engine';

const schemaExample = {
  "required": [
    "name",
    "email"
  ],
  "title": "Edit Profiles",
  "description": "Please provide all required data",
  "properties": {
    "name": {
      "title": "Name",
      "description": "Type your name",
      "type": "string",
      "maxLength": 64,
      "x-validationMessages": {
        "required": "This field is required",
        "maxlength": "The max length is 64"
      }
    },
    "document": {
      "title": "Document",
      "pattern": "\\d{3}.\\d{3}",
      "x-validationMessages": {
        "pattern": "required format: 000.000"
      }
    },
    "email": {
      "title": "Email",
      "description": "your@email",
      "type": "string",
      "format": "email",
      "x-validationMessages": {
        "required": "This field is required",
        "email": "invalid email"
      }
    },
    "birthday": {
      "title": "Day of birth",
      "description": "Type your day of birth",
      "type": "string",
      "format": "date"
    },
    "nextAppointment": {
      "title": "Next appointment",
      "description": "when is your next appointment?",
      "type": "string",
      "format": "date-time"
    },
    "score": {
      "type": "integer"
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
  schemaControl = this.formBuilder.control('');
  formGroupInfo: FormGroupInfo;
  err;
  constructor(private formBuilder: FormBuilder, private oangEngine: OangEngine) {
    this.schemaControl.valueChanges.subscribe(schema => {
      try {
        this.formGroupInfo = null;
        this.formGroupInfo = oangEngine.createForm(JSON.parse(schema));
        localStorage.setItem('schema', schema);
      } catch (err) {
        this.err = err;
      }
    });
    let memory = localStorage.getItem('schema');
    if (memory === undefined) {
      this.reset();
    }
    this.schemaControl.setValue(localStorage.getItem('schema'));
  }

  submit() {
    alert('Valid:' + this.formGroupInfo.control.valid);
  }

  reset() {
    this.schemaControl.setValue(JSON.stringify(schemaExample, null, 2))
  }
}
