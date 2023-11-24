import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DevicesModel} from "../shared/device.model";
import {SimpleResponseModel} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient
  ) { }

  private api = `${environment.apiUrl}/_devices`;

  ls(): Observable<DevicesModel> {
    return this.http.get<DevicesModel>(`${this.api}/v1`);
  }

  delete(deviceID: string): Observable<SimpleResponseModel> {
    return this.http.delete<SimpleResponseModel>(`${this.api}/v1/${deviceID}`)
  }

}
