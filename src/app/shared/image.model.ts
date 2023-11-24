import {FileObject} from "./saved.model";

export interface ImageObject {
  id: string;
  width: number;
  height: number;
  file: FileObject;
}
