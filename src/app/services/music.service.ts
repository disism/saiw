import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {IpfsModel} from "../shared/ipfs.model";
import {Observable} from "rxjs";
import {AddsMusicsResponseModel, MusicEditModel, MusicModel} from "../shared/music.model";
import {HttpClient} from "@angular/common/http";
import {SimpleResponseModel} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(
    private http: HttpClient
  ) { }

  private api = `${environment.apiUrl}/_streaming/v1/musics`

  add(objects: IpfsModel[]): Observable<AddsMusicsResponseModel> {
    const raw = JSON.stringify(objects)
    return this.http.post<AddsMusicsResponseModel>(this.api, raw)
  }

  save(id: string): Observable<SimpleResponseModel> {
    return this.http.post<SimpleResponseModel>(`${this.api}/${id}`, null)
  }

  ls():Observable<MusicModel[]> {
    return this.http.get<MusicModel[]>(this.api)
  }

  get(id: string): Observable<MusicModel> {
    return this.http.get<MusicModel>(`${this.api}/${id}`)
  }

  edit(id: string, model: MusicEditModel): Observable<MusicModel> {
    return this.http.put<MusicModel>(`${this.api}/${id}`, JSON.stringify(model))
  }

  delete(id: string): Observable<SimpleResponseModel> {
    return this.http.delete<SimpleResponseModel>(`${this.api}/${id}`)
  }

}
