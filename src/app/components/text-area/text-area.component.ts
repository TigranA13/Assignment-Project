import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ConfigRequestData } from '../../shared/interfaces';

@Component({
  selector: 'app-text-area',
  template: `
    <mat-form-field class="example-full-width" [formGroup]="group" *ngIf="field['details']['visible']">
      <textarea matInput [rows]="field['details']['rows']" [formControlName]="field['id']" [placeholder]="field['details']['label']"></textarea>
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
export class TextAreaComponent {
  field!: ConfigRequestData | any;
  group!: FormGroup;

  constructor() { }

}
