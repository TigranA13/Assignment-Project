import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { ConfirmationPopupComponent } from '../dialog/confirmation-popup/confirmation-popup.component';
import { AddEditFieldPopupComponent } from '../dialog/add-edit-field-popup/add-edit-field-popup.component';

import { ConfigRequestData } from '../shared/interfaces';
import { FieldsService } from '../services/fields.service';
import { ConfigRequestService } from '../services/config-request.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<ConfigRequestData> | undefined;
  displayedColumns = ['label', 'type', 'action'];
  dataSource: ConfigRequestData[] = [];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fieldsService: FieldsService,
    private configReqService: ConfigRequestService,
  ) {}

  ngOnInit(): void {
    // set data from fields service
    this.dataSource = this.fieldsService.fields;
    // get config data form api if not exist
    !this.fieldsService.fields.length && this.configReqService.getConfig()
      .pipe(map(res => {
        // save data in service
        this.fieldsService.fields = res;
        this.dataSource = this.fieldsService.fields;
      })).subscribe();
  }

  addEditFiled(type: string, row?: ConfigRequestData): void {
    const dialogRef =  this.dialog.open(AddEditFieldPopupComponent, {
      width: '400px',
      data: { data: row, type: type },
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          // if filed exist in array change it with new else add new filed
          const index = this.dataSource.findIndex(val => val.id === res.id);

          index !== -1 ? this.dataSource[index] = res : this.dataSource.push(res);
          this.table?.renderRows();
          this.setFields();
        }
      });
  }

  deleteRow(row: ConfigRequestData): void {
    const dialogRef =  this.dialog.open(ConfirmationPopupComponent, {
      data: { message: row.details.label },
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          // remove filed
          this.dataSource = this.dataSource.filter(res => res.id !== row.id);
          this.setFields();
        }
      });
  }

  setFields() {
    // set new fields array
    this.fieldsService.fields = this.dataSource;
  }
}
