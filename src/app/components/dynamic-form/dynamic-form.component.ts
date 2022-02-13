import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigRequestData } from '../../shared/interfaces';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
      <ng-container *ngFor="let field of fields;" appDynamicField [field]="field" [group]="form">
      </ng-container>
      <button mat-raised-button color="primary" type="submit">Submit</button>
    </form>
  `,
  styles: [
    `.dynamic-form {
      display: flex;
      flex-direction: column;
      width: 50%;
    }`,
    `button {
      margin-top: 20px;
      width: 20%;
    }`
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: ConfigRequestData[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createControl();
  }

  // Method for creating form controls from provided fields
  createControl(): FormGroup {
    const group = this.fb.group({});

    this.fields?.forEach(field => {
      const control = this.fb.control(
        '',
        this.addValidation(field.details.required),
      );
      group.addControl(String(field.id), control);
    });
    return group;
  }

  // Method for adding validation to controls dynamically
  addValidation(validations: boolean): Validators | null {
    if (validations) {
      return Validators.required;
    }
    return null;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // If form is valid send data to parent component else validate form
    this.form?.valid ? this.submit.emit(this.form.value) : this.validateAllFormFields(this.form);
  }

  // Marks all filed as touched in order to show validation error in template
  validateAllFormFields(formGroup: FormGroup): void {
    for (let i in formGroup?.controls) {
      formGroup?.controls[i].markAsTouched();
    }
  }
}
