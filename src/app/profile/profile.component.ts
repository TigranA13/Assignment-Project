import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs';

import { ConfigRequestData } from '../shared/interfaces';
import { FieldsService } from '../services/fields.service';
import { ConfigRequestService } from '../services/config-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fields: ConfigRequestData[] = [];

  constructor(
    private fieldsService: FieldsService,
    private configReqService: ConfigRequestService,
  ) {}

  ngOnInit(): void {
    // set data from fields service
    this.fields = this.fieldsService.fields;
    // get config data form api if not exist
    !this.fields.length && this.configReqService.getConfig()
      .pipe(map(res => {
        // save data in service
        this.fieldsService.fields = res;
        this.fields = res;
      })).subscribe();
  }

  submit(e: any): void {}
}
