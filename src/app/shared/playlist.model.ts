import {ImageModel} from "./image.model";
import {MusicModel} from "./music.model";

export interface PlaylistModel {
  id: string;
  name: string;
  description: string;
  private: boolean;
  image: ImageModel;
  musics: MusicModel[];
}


export interface PlaylistCreateResponseModel {
  code: number;
  id: string;
}
