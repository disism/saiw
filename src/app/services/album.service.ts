import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MusicArtistObject} from "../shared/music.model";
import {Observable} from "rxjs";
import {MusicAlbumObject} from "../shared/album.model";
import {SimpleResponse} from "../shared/http.model";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/_streaming/v1/musics/albums`

  list(): Observable<MusicAlbumObject[]> {
    return this.http.get<MusicAlbumObject[]>(this.api)
  }

  create(title: string, image_id: string, year: string,  description?: string, artist_ids?: MusicArtistObject[]) {
    const f = new FormData()
    f.append("title", title)
    f.append("image_id", image_id)
    f.append("year", year)
    if (description!) {
      f.append("description", description)
    }
    if (artist_ids!.length > 0) {
      artist_ids?.forEach(i => {
        f.append("artist_id", i.id)
      })
    }


    return this.http.post(this.api, f)
  }

  get(album_id: string): Observable<MusicAlbumObject> {
    return this.http.get<MusicAlbumObject>(`${this.api}/${album_id}`)
  }

  edit(
    album_id: string,
    title?: string,
    image_id?: string,
    year?: string,
    description?: string,
    ): Observable<SimpleResponse> {
    const f = new FormData()
    if (title) {
      f.append("title", title)
    }
    if (image_id) {
      f.append("image_id", image_id)
    }
    if (description) {
      f.append("description", description)
    }
    if (year) {
      f.append("year", year)
    }

    return this.http.put<SimpleResponse>(`${this.api}/${album_id}`, f)
  }

  delete(album_id: string): Observable<SimpleResponse> {
    return this.http.delete<SimpleResponse>(`${this.api}/${album_id}`)
  }

  addArtist(album_id: string, artist_id: string) {
    const f = new FormData()
    f.append("artist_id", artist_id)
    return this.http.post<SimpleResponse>(`${this.api}/${album_id}/artists`, f)
  }

  removeArtist(album_id: string, artist_id: string): Observable<SimpleResponse> {
    const f = new FormData()
    f.append("artist_id", artist_id)
    return this.http.put<SimpleResponse>(`${this.api}/${album_id}/artists`, f)
  }

  addMusics(album_id: string, musics: string[]): Observable<SimpleResponse> {
    const f = new FormData()
    if (musics && musics.length > 0) {
      for (const music of musics) {
        f.append('music_id', music);
      }
    }
    return this.http.post<SimpleResponse>(`${this.api}/${album_id}/musics`, f)
  }
  removeMusics(album_id: string, musics: string[]): Observable<SimpleResponse> {
    const f = new FormData()
    if (musics && musics.length > 0) {
      for (const music of musics) {
        f.append('music_id', music);
      }
    }
    return this.http.put<SimpleResponse>(`${this.api}/${album_id}/musics`, f)
  }
}
