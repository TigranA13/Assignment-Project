import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogDataConfirmation } from '../../shared/interfaces';

@Component({
  selector: 'confirmation-popup',
  templateUrl: 'confirmation-popup.component.html',
})
export class ConfirmationPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDataConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataConfirmation
  ) {}

  submit(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
