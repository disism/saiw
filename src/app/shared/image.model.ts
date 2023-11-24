import {IpfsModel} from "./ipfs.model";

export interface ImageModel {
  id: string;
  width: number;
  height: number;
  file: IpfsModel;
}

export interface AddImageModel {
  name: string;
  hash: string;
  size: string;
  height: number;
  width: number;
}

export interface AddImageResponseModel {
  code: number;
  id: string;
  hash: string;
}
