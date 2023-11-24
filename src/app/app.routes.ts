import { Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {AuthComponent} from "./auth/auth.component";
import {authGuard} from "./auth.guard";
import {IamComponent} from "./iam/iam.component";
import {DeviceComponent} from "./iam/device/device.component";
import {MusicComponent} from "./music/music.component";
import {LibraryComponent} from "./music/library/library.component";
import {EditMusicComponent} from "./music/library/edit-music/edit-music.component";
import {PlaylistComponent} from "./music/playlist/playlist.component";
import {PlaylistsComponent} from "./music/playlist/playlists/playlists.component";
import {AlbumsComponent} from "./music/album/albums/albums.component";
import {AlbumCreateComponent} from "./music/album/album-create/album-create.component";
import {AlbumComponent} from "./music/album/album.component";
import {AlbumEditComponent} from "./music/album/album-edit/album-edit.component";

export const routes: Routes = [
  {
    path: 'about',
    title: 'About',
    component: AboutComponent
  },
  {
    path: 'auth',
    title: 'Auth',
    component: AuthComponent,
    canActivate: [authGuard]
  },
  {
    path: 'iam',
    title: 'IAm',
    component: IamComponent,
    canActivate: [authGuard],
  },
  {
    path: 'iam/device',
    title: "Device",
    component: DeviceComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    title: 'Music',
    component: MusicComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/library',
    title:'Music Library',
    component: LibraryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/edit/:id',
    title:'Edit Music',
    component: EditMusicComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/playlists',
    title:'Music Playlists',
    component: PlaylistsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/playlist/:id',
    title:'Music Playlist',
    component: PlaylistComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/albums',
    title:'Albums',
    component: AlbumsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/album/create',
    title:'Album Create',
    component: AlbumCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/album/edit/:id',
    title:'Album Edit',
    component: AlbumEditComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/album/:id',
    title:'Album',
    component: AlbumComponent,
    canActivate: [authGuard]
  },
];
