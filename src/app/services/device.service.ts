import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DeviceObject} from "../shared/device.model";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private http: HttpClient,
  ) { }

  private api = `${environment.apiUrl}/_devices/v1`;

  getDevices(): Observable<DeviceObject[]> {
    return this.http.get<DeviceObject[]>(this.api);
  }

  deleteDevice(deviceId: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${deviceId}`)
  }

}
