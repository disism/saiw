import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthNResponseObject} from "../shared/authx.model";
import {appConfig} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class AuthxService {

  constructor(
    private http: HttpClient,
  ) { }

  authn(id_token: string): Observable<AuthNResponseObject> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${id_token}`,
      'Skip-Interceptor': ''
    });
    return this.http.get<AuthNResponseObject>(
      `${environment.apiUrl}/authn`, {headers}
    )
  }

  login(username: string, password: string): Observable<AuthNResponseObject>  {
    const headers = new HttpHeaders({
      'Skip-Interceptor': ''
    });
    const f = new FormData()
    f.append("username", username)
    f.append("password", password)

    return this.http.post<AuthNResponseObject>(`${environment.apiUrl}/login`, f)
  }

}
