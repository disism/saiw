import { Injectable } from '@angular/core';
import {MusicArtistModel} from "../shared/music.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/_streaming/v1/musics/artists`

  search(name: string): Observable<MusicArtistModel[]> {
    return this.http.get<MusicArtistModel[]>(`${this.api}?name=${name}`)
  }

  add(name: string): Observable<MusicArtistModel> {
    const f = new FormData()
    f.append("name", name)
    return this.http.post<MusicArtistModel>(`${this.api}`, f)
  }
}
