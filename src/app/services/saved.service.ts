import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPFSObject} from "../shared/ipfs.model";
import {SavedObject} from "../shared/saved.model";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class SavedService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/_saved/v1`

  add(saves: IPFSObject[], id?: string): Observable<any> {
    const formData = new FormData();
    saves.forEach(file => {
      formData.append('files', JSON.stringify(file));
    });
    return this.http.post(`${this.api}${id ? `?dir_id=${id}` : ''}`, formData)
  }

  ls(): Observable<SavedObject[]> {
    return this.http.get<SavedObject[]>(this.api)
  }

  rm(id: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${id}`)
  }

  link(saved_id: string, dir_id?: string): Observable<SimpleResponse> {
    const f = new FormData()
    f.append("dir_id", dir_id!)
    return this.http.put<SimpleResponse>(`${this.api}/${saved_id}/link`, f)
  }

  unlink(saved_id: string, dir_id?: string): Observable<SimpleResponse> {
    const f = new FormData()
    if (dir_id!) {
      f.append("dir_id", dir_id)
    }
    return this.http.put<SimpleResponse>(`${this.api}/${saved_id}/unlink`, f)
  }

  edit(saved_id: string, caption: string): Observable<SimpleResponse> {
    const f = new FormData()
    f.append("caption", caption)
    return this.http.put<SimpleResponse>(`${this.api}/${saved_id}`, f)
  }

}
