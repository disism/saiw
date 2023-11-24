import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PlaylistCreateResponseModel} from "../shared/playlist.model";
import {
  AlbumCreateModel,
  AlbumEditModel, AlbumModel,
  EditAlbumResponseModel,
  GetAlbumsResponseModel
} from "../shared/album.model";
import {SimpleResponseModel} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})

export class AlbumService {

  private api = `${environment.apiUrl}/_streaming/v1/musics/albums`

  constructor(
    private http: HttpClient
  ) { }

  create(model: AlbumCreateModel): Observable<PlaylistCreateResponseModel> {
    return this.http.post<PlaylistCreateResponseModel>(this.api, JSON.stringify(model));
  }

  list(): Observable<GetAlbumsResponseModel> {
    return this.http.get<GetAlbumsResponseModel>(this.api);
  }

  get(id: string): Observable<AlbumModel> {
    return this.http.get<AlbumModel>(`${this.api}/${id}`);
  }

  edit(id: string, edit: AlbumEditModel): Observable<EditAlbumResponseModel>  {
    return this.http.put<EditAlbumResponseModel>(`${this.api}/${id}`, JSON.stringify(edit));
  }

  delete(id: string): Observable<SimpleResponseModel> {
    return this.http.delete<SimpleResponseModel>(`${this.api}/${id}`);
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
}
