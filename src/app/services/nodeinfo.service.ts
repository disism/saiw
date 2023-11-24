import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {NodeInfoObject} from "../shared/nodeinfo.model";

@Injectable({
  providedIn: 'root'
})
export class NodeinfoService {

  constructor(private http: HttpClient) { }

  getNodeInfo(): Observable<NodeInfoObject> {
    return this.http.get<NodeInfoObject>(`${environment.apiUrl}/.well-known/node-info`);
  }

}
