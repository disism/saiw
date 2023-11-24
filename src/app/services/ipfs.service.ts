import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {IPFSObject} from "../shared/ipfs.model";

@Injectable({
  providedIn: 'root'
})
export class IpfsService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/_ipfs/v1`
  private gw = environment.ipfs_gateway

  add(files: FileList): Observable<IPFSObject[]> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('path', files[i]);
    }
    return this.http.post<IPFSObject[]>(`${this.api}/add`, formData);
  }

  gateway(): string {
    return this.gw
  }

}
