import {FileObject} from "./saved.model";

export interface MusicObject {
  id: string;
  create_time: string;
  update_time: string;
  name: string;
  description: string;
  file: FileObject;
  artists: MusicArtistObject[];
}

export interface MusicExistsObject {
  name: string;
  music: MusicObject[];
}

export interface MusicCreateObject {
  code: number;
  creates: MusicObject[];
  exists: MusicExistsObject[];
}

export interface MusicArtistObject {
  id: string
  name: string
}
