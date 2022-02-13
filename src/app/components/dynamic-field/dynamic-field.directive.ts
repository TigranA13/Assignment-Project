import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputComponent } from '../input/input.component';
import { TextAreaComponent } from '../text-area/text-area.component';

import { FormFieldTypes, ConfigRequestData } from '../../shared/interfaces';

// input types list
const formFieldTypes: FormFieldTypes | any = {
  input: InputComponent,
  textArea: TextAreaComponent,
}

// This Directive is for creating dynamic fields
@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field!: ConfigRequestData;
  @Input() group!: FormGroup;

  componentRef: any;

  constructor(private container: ViewContainerRef) {}

  ngOnInit() {
    // If filed type is Name or Link create input component else create text area component
    if (this.field.type === 'NAME' || this.field.type === 'LINK') {
      this.componentRef = this.container.createComponent(formFieldTypes.input);
    } else {
      this.componentRef = this.container.createComponent(formFieldTypes.textArea);
    }
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
