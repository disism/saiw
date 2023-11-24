import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthNResponseObject} from "../shared/authx.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(username: string, password: string): Observable<AuthNResponseObject> {
    const f = new FormData
    f.append("username", username)
    f.append("password", password)
    return this.http.post<AuthNResponseObject>(`${environment.apiUrl}/users/create`, f)
  }
}
