import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DirObject} from "../shared/saved.model";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class DirService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/_saved/v1/dirs`

  ls(id?: string): Observable<DirObject> {
    const url = `${this.api}${id ? `?dir_id=${id}` : ''}`;
    return this.http.get<DirObject>(url)
  }

  all(): Observable<DirObject[]> {
    const url = `${this.api}/all`;
    return this.http.get<DirObject[]>(url)
  }

  mk(name: string, id?: string): Observable<DirObject> {
    const formData = new FormData();
    formData.append('name', name);

    const url = `${this.api}${id ? `?dir_id=${id}` : ''}`;
    return this.http.post<DirObject>(url, formData);
  }

  mv(id: string, target_id: string): Observable<SimpleResponse> {
    return this.http.put<SimpleResponse>(`${this.api}/${id}/mv/${target_id}`, {})
  }

  rename(id: string, name: string): Observable<SimpleResponse> {
    const fd = new  FormData()
    fd.append('name', name)
    return this.http.patch<SimpleResponse>(`${this.api}/${id}/name`, fd)
  }

  rm(id: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${id}`)
  }
}
