import { Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {AuthxComponent} from "./authx/authx.component";
import {DisismComponent} from "./authx/disism/disism.component";
import {SavedComponent} from "./saved/saved.component";
import {authGuard} from "./auth.guard";
import {IamComponent} from "./iam/iam.component";
import {DeviceComponent} from "./iam/device/device.component";
import {SavesComponent} from "./saved/saves/saves.component";
import {MusicComponent} from "./music/music.component";
import {LibraryComponent} from "./music/library/library.component";
import {EditMusicComponent} from "./music/library/edit-music/edit-music.component";
import {CreatePlaylistComponent} from "./music/playlists/create-playlist/create-playlist.component";
import {PlaylistsComponent} from "./music/playlists/playlists.component";
import {PlaylistComponent} from "./music/playlists/playlist/playlist.component";
import {AlbumsComponent} from "./music/albums/albums.component";
import {CreateAlbumComponent} from "./music/albums/create-album/create-album.component";
import {AlbumComponent} from "./music/albums/album/album.component";

export const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'authx',
    title: "Auth",
    component: AuthxComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'disism',
        title: "disism authorize",
        component: DisismComponent
      }
    ]
  },
  {
    path: 'iam',
    title: "IAm",
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
    path: 'saved',
    title:'Saved',
    component: SavedComponent,
    canActivate: [authGuard]
  },
  {
    path: 'saved/:id',
    title:'Dir',
    component: SavedComponent,
    canActivate: [authGuard]
  },
  {
    path: 'saves',
    title:'Saves',
    component: SavesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music',
    title:'Music',
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
    path: 'music/library/edit/:id',
    title:'Edit Music',
    component: EditMusicComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/playlists',
    title:'Playlists',
    component: PlaylistsComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard]
  },
  {
    path: 'music/playlists/create',
    title:'Create Playlist',
    component: CreatePlaylistComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/playlist/:id',
    title:'Playlist',
    component: PlaylistComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/albums',
    title:'Albums',
    component: AlbumsComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard]
  },
  {
    path: 'music/albums/create',
    title:'Create Album',
    component: CreateAlbumComponent,
    canActivate: [authGuard]
  },
  {
    path: 'music/album/:id',
    title:'Album',
    component: AlbumComponent,
    canActivate: [authGuard]
  },

];
