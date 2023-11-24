import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthResponseModel} from "../shared/auth.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string): Observable<AuthResponseModel>  {
    const f = new FormData()
    f.append("username", username)
    f.append("password", password)
    return this.http.post<AuthResponseModel>(`${environment.apiUrl}/login`, f)
  }
}
