import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigRequestData } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigRequestService {
  url: string = "http://localhost:3000/configs";

  constructor(private http: HttpClient) { }

  getConfig(): Observable<ConfigRequestData[]> {
    return this.http.get<ConfigRequestData[]>(this.url);
  }
}
