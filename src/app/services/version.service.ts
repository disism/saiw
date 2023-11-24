import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VersionObject} from "../shared/version.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) {}

  getVersion(): Observable<VersionObject> {
    return this.http.get<VersionObject>(`${environment.apiUrl}/version`);
  }

}
