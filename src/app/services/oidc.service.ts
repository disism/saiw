import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {
  OpenIDConfigurationObject,
  OpenIDTokenResponseObject
} from "../shared/openid.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OidcService {

  constructor(private http: HttpClient) {
  }

  discover(configuration_endpoint: string): Observable<OpenIDConfigurationObject> {
    return this.http.get<OpenIDConfigurationObject>(configuration_endpoint)
  }

  getToken(token_endpoint: string, client_id: string, client_secret: string,
           code: string, redirect_uri: string, code_verifier: string
  ): Observable<OpenIDTokenResponseObject> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`,
      'Skip-Interceptor': '',
    });

    const body = new HttpParams()
      .set('code', code)
      .set('redirect_uri', redirect_uri)
      .set('grant_type', 'authorization_code')
      .set('code_verifier', code_verifier)
      .set('client_id', client_id);

    return this.http.post<OpenIDTokenResponseObject>(token_endpoint, body.toString(), {headers});
  }
}
