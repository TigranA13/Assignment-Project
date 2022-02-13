import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfigRequestData, DialogDataAddEditField, Types } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'add-edit-field-popup',
  templateUrl: 'add-edit-field-popup.component.html',
  styleUrls: ['add-edit-field-popup.component.scss'],
})
export class AddEditFieldPopupComponent implements OnInit, OnDestroy {
  types: Types[] = [
    {id: 1, name: 'NAME'},
    {id: 2, name: 'TEXT'},
    {id: 3, name: 'LINK'},
  ];
  form!: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogDataAddEditField>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataAddEditField,
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    // find selected type id form data
    const typeId = this.types.find(res => res.name.toLowerCase() === this.data.data?.type.toLowerCase())?.id;

    // create form group
    this.form = this.fb.group({
      label: [this.data.data?.details.label ?? null, Validators.required],
      type: [typeId ?? null, Validators.required],
      required: [this.data.data?.details.required ?? true],
      visible: [this.data.data?.details.visible ?? true],
      rows: [this.data.data?.details.rows ?? null],
    });

    // check if text area selected if true add validation to filed
    this.subscription.add(this.form.get('type')?.valueChanges
      .subscribe(res => this.form?.get('rows')?.setValidators(res === 2 ? Validators.required : null)));
  }

  submit(): void {
    // if form is not valid mark all fields as touched in order to show errors in template
    if (!this.form?.valid) {
      for (let i in this.form?.controls) {
        this.form?.controls[i].markAsTouched()
      }
    } else {
      // create new data object with configured parameters
      const data: ConfigRequestData = {
        id: this.data.data?.id ?? Math.floor(Math.random() * 10000),
        type: this.types.find(res => res.id === this.form?.value.type)?.name ?? '',
        details: {
          label: this.form?.value.label,
          required: this.form?.value.required,
          visible: this.form?.value.visible,
        },
      }
      // if text filed selected add rows parameter to data object
      this.form?.value.type === 2 && (data.details['rows'] = this.form?.value.rows);
      this.dialogRef.close(data);
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
