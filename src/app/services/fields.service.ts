import { Injectable } from '@angular/core';

import { ConfigRequestData } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {
  fieldsList: ConfigRequestData[] = [];

  constructor() {}

  set fields(value: ConfigRequestData[]) {
    this.fieldsList = value;
  }

  get fields(): ConfigRequestData[] {
    return this.fieldsList;
  }
}
