
export interface SubdirObject {
  id: string;
  create_time: string;
  update_time: string;
  name: string;
}

export interface DirObject {
  id: string;
  create_time: string;
  update_time: string;
  name: string;
  subdirs: SubdirObject[];
  saves: SavedObject[];
}

export interface FileObject {
  id: string;
  hash: string;
  name: string;
  size: string;
}
export interface SavedObject {
  id: string
  name: string;
  caption: string;
  file: FileObject;
}
