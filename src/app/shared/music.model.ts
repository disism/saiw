import {IpfsModel} from "./ipfs.model";


export interface MusicModel {
  id: string;
  create_time: string;
  update_time: string;
  name: string;
  description: string;
  file: IpfsModel;
  artists: MusicArtistModel[];
}

export interface MusicEditModel {
  name: string;
  description: string;
  add_artists: string[];
  remove_artists: string[];
}

export interface MusicExistsModel {
  name: string;
  music: MusicModel[];
}

export interface AddsMusicsResponseModel {
  code: number;
  creates: MusicModel[];
  exists: MusicExistsModel[];
}


export interface MusicArtistModel {
  id: string
  name: string
}

export interface MusicArtistModel {
  id: string
  name: string
}

