import {ImageObject} from "./image.model";
import {MusicArtistObject, MusicObject} from "./music.model";

export interface MusicAlbumObject {
  id: string;
  title: string;
  description: string;
  year: string;
  image: ImageObject;
  musics: MusicObject[];
  artists: MusicArtistObject[];
}
