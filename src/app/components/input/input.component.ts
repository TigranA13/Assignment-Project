import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConfigRequestData } from '../../shared/interfaces';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field class="example-full-width" [formGroup]="group" *ngIf="field['details']['visible']">
      <input matInput [formControlName]="field['id']" [placeholder]="field['details']['label']" type="text">
      <mat-error *ngIf="group.get(field?.id?.toString())?.hasError('required')">
        {{field?.details?.label}} is <strong>required</strong>
      </mat-error>
    </mat-form-field>
  `,
  styles: [
    `.example-full-width {
      width: 100%;
    }`
  ]
})
export class InputComponent {
  field!: ConfigRequestData | any;
  group!: FormGroup;

  constructor() { }
}
