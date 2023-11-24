import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MusicArtistObject} from "../shared/music.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/_streaming/v1/musics/artists`

  search(name: string): Observable<MusicArtistObject[]> {
    return this.http.get<MusicArtistObject[]>(`${this.api}?name=${name}`)
  }

  add(name: string): Observable<MusicArtistObject> {
    const f = new FormData()
    f.append("name", name)
    return this.http.post<MusicArtistObject>(`${this.api}`, f)
  }
}
