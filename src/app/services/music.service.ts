import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IPFSObject} from "../shared/ipfs.model";
import {Observable} from "rxjs";
import {MusicArtistObject, MusicCreateObject, MusicObject} from "../shared/music.model";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})

export class MusicService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/_streaming/v1/musics`

  add(objects: IPFSObject[]): Observable<MusicCreateObject> {
    const form = new FormData();
    objects.forEach(f => {
      form.append("music", JSON.stringify(f))
    })
    return this.http.post<MusicCreateObject>(`${this.api}`, form)
  }

  ls(): Observable<MusicObject[]> {
    return this.http.get<MusicObject[]>(this.api)
  }

  get(id: string): Observable<MusicObject> {
    return this.http.get<MusicObject>(`${this.api}/${id}`)
  }

  remove(id: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${id}`)
  }

  addToLibrary(id: string): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(`${this.api}/${id}/library`, {})
  }

  edit(id: string, name?: string, description?: string) {
    const f = new FormData();
    if (name!) {
      f.append("name", name)
    }
    if (description!) {
      f.append("description", description)
    }
    return this.http.put<SimpleResponse>(`${this.api}/${id}`, f);
  }

  addArtists(id: string, artists: string[]): Observable<SimpleResponse> {
    const f = new FormData()
    artists.forEach(a => {
      f.append("artist_id", a)
    })
    return this.http.post<SimpleResponse>(`${this.api}/${id}/artists`, f)
  }

  removeArtists(id: string, artists: string[]): Observable<SimpleResponse> {
    const f = new FormData()
    artists.forEach(a => {
      f.append("artist_id", a)
    })
    return this.http.delete<SimpleResponse>(`${this.api}/${id}/artists`, { body: f })
  }

}
