import {ImageModel} from "./image.model";
import {MusicArtistModel, MusicModel} from "./music.model";

export interface AlbumModel {
  id: string;
  title: string;
  description: string;
  date: string;
  image: ImageModel;
  musics: MusicModel[];
  artists: MusicArtistModel[];
}

export interface GetAlbumsResponseModel {
  code: number;
  albums: AlbumModel[];
}

export interface AlbumCreateModel {
  title: string;
  date: string;
  artist_ids: string[];
  cover_id: string;
  description: string;
}

export interface AlbumEditModel {
  title: string;
  date: string;
  add_artist_ids: string[];
  remove_artist_ids: string[];
  cover_id: string;
  description: string;
}

export interface EditAlbumResponseModel {
  code: number
  id: string;
}
