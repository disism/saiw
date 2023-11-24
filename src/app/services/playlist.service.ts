import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {SimpleResponseModel} from "../shared/http.model";
import {PlaylistCreateResponseModel, PlaylistModel} from "../shared/playlist.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  private api = `${environment.apiUrl}/_streaming/v1/musics/playlists`

  create(name: string, isPrivate: boolean): Observable<PlaylistCreateResponseModel> {
    const raw = {
      name: name,
      isPrivate: isPrivate
    }

    return this.http.post<PlaylistCreateResponseModel>(this.api, JSON.stringify(raw));
  }

  list(): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistModel[]>(this.api);
  }

  get(id: string): Observable<PlaylistModel> {
    return this.http.get<PlaylistModel>(`${this.api}/${id}`);
  }

  addMusics(id: string, musicIds: string[]): Observable<SimpleResponseModel> {
    const raw = {
      music_ids: musicIds
    }
    return this.http.put<SimpleResponseModel>(`${this.api}/${id}/musics/add`, JSON.stringify(raw));
  }

  removeMusics(id: string, musicIds: string[]): Observable<SimpleResponseModel> {
    const raw = {
      music_ids: musicIds
    }
    return this.http.put<SimpleResponseModel>(`${this.api}/${id}/musics/remove`, JSON.stringify(raw));
  }

  removeImage(id: string): Observable<SimpleResponseModel> {
    return this.http.put<SimpleResponseModel>(`${this.api}/${id}/images/remove`, {});
  }

  edit(id: string, name: string, description: string, coverId: string, isPrivate: boolean): Observable<SimpleResponseModel> {
    const raw = {
      name: name,
      description: description,
      cover_id: coverId,
      isPrivate: isPrivate
    }

    console.log(raw)
    return this.http.put<SimpleResponseModel>(`${this.api}/${id}`, JSON.stringify(raw));
  }

  delete(id: string): Observable<SimpleResponseModel> {
    return this.http.delete<SimpleResponseModel>(`${this.api}/${id}`);
  }
}
