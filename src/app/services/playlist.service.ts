import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PlaylistObject} from "../shared/playlist.model";
import {Observable} from "rxjs";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  private api = `${environment.apiUrl}/_streaming/v1/musics/playlists`

  create(name: string, description?: string, image_id?: string, isPrivate?: string) {
    const f = new FormData()
    f.append("name", name)

    if (description) {
      f.append("description", description)
    }
    if (image_id) {
      f.append("image_id", image_id)
    }
    if (isPrivate) {
      f.append("private", isPrivate)
    }
    return this.http.post(this.api, f)
  }

  list(): Observable<PlaylistObject[]> {
    return this.http.get<PlaylistObject[]>(this.api)
  }

  delete(id: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${id}`)
  }

  getPlaylist(id: string): Observable<PlaylistObject> {
    return this.http.get<PlaylistObject>(`${this.api}/${id}`)
  }

  editPlaylist(id: string, name?: string, description?: string, isPrivate?: string): Observable<SimpleResponse> {
    const f = new FormData()
    if (name!) {
      f.append("name", name)
    }
    if (description!) {
      f.append("description", description)
    }
    if (isPrivate!) {
      f.append("private", isPrivate)
    }
    return this.http.put<SimpleResponse>(`${this.api}/${id}`, f)
  }

  editPlaylistImage(id: string, image_id: string): Observable<SimpleResponse> {
    const f = new FormData()
    f.append("image_id", image_id)
    return this.http.patch<SimpleResponse>(`${this.api}/${id}/images`, f)
  }

  removePlayListImage(id: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${id}/images`)
  }

  addMusics(id: string, musics: string[]): Observable<SimpleResponse> {
    const f = new FormData()
    if (musics && musics.length > 0) {
      for (const music of musics) {
        f.append('music_id', music);
      }
    }
    return this.http.post<SimpleResponse>(`${this.api}/${id}/musics`, f)
  }

  removeMusics(id: string, musics: string[]): Observable<SimpleResponse> {
    const f = new FormData()
    if (musics && musics.length > 0) {
      for (const music of musics) {
        f.append('music_id', music);
      }
    }
    return this.http.put<SimpleResponse>(`${this.api}/${id}/musics`, f)
  }

}
