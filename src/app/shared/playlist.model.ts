import {ImageObject} from "./image.model";
import {MusicObject} from "./music.model";

export interface PlaylistObject {
  id: string;
  name: string;
  description: string;
  private: boolean;
  image: ImageObject;
  musics: MusicObject[];
}
