import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IpfsService} from "../../services/ipfs.service";
import {MusicService} from "../../services/music.service";
import {EMPTY, Observable} from "rxjs";
import {MusicArtistObject, MusicExistsObject, MusicObject} from "../../shared/music.model";
import {DownloadButtonComponent} from "../../saved/shared/download_button.component";
import {SizePipe} from "../../pipes/size.pipe";
import {FormsModule} from "@angular/forms";
import {ArtistService} from "../../services/artist.service";
import {Router, RouterLink} from "@angular/router";
import {routes} from "../../app.routes";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {PlaylistService} from "../../services/playlist.service";
import {PlaylistObject} from "../../shared/playlist.model";
import {AlbumService} from "../../services/album.service";
import {MusicAlbumObject} from "../../shared/album.model";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, DownloadButtonComponent, SizePipe, FormsModule, RouterLink],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})


export class LibraryComponent {
  exists!: MusicExistsObject[]
  musics$!: Observable<MusicObject[]>
  selectedMusicIds: string[] = [];
  playlists$!: Observable<PlaylistObject[]>
  selectPlaylistId!: string
  albums$!: Observable<MusicAlbumObject[]>
  selectAlbumId!: string

  constructor(
    private ipfsService: IpfsService,
    private musicService: MusicService,
    private router: Router,
    private playlistServices: PlaylistService,
    private albumServices: AlbumService,
  ) {}

  ngOnInit() {
    this.lsMusics()
    this.getPlaylists()
    this.getAlbums()
  }

  lsMusics() {
    this.musics$ = this.musicService.ls()
  }

  getPlaylists() {
    this.playlists$ = this.playlistServices.list()
    this.playlists$.subscribe(r => {
      console.log(r)
    })
  }
  getAlbums() {
    this.albums$ = this.albumServices.list()
    this.albums$.subscribe(r => {
      console.log(r)
    })
  }

  onMusicSelected(event: any) {
    this.ipfsService.add(event.target.files).subscribe(r => {
      this.musicService.add(r).subscribe(r => {
        if (r.exists) {
          this.exists = r.exists
          console.log(r.exists)
        }
        this.lsMusics()
      })
    })
  }

  deleteMusic(id: string) {
    this.musicService.remove(id).subscribe({
      next: () => {
        this.lsMusics()
      },
      error: error => {
        console.log(error)
      }
    })
  }

  addToMyLibrary(id: string) {
    console.log(id)
    this.musicService.addToLibrary(id).subscribe({
      next: (r) => {
        this.lsMusics()
      },
      error: (error) =>{
        console.log(error)
        if (error.status === 422) {
          alert('The music already exists in the library');
        }
      }
    })
  }
  goEdit(id: string) {
    this.router.navigate(["music/library/edit", id])
  }

  completeUpload() {
    this.exists = []
  }

  onCheckboxChange(e: any, musicId: string) {

    if (e.target.checked) {
      this.selectedMusicIds.push(musicId);
    } else {
      this.selectedMusicIds = this.selectedMusicIds.filter(id => id !== musicId);
    }
  }

  addToPlaylist() {
    this.playlistServices.addMusics(
      this.selectPlaylistId!,
      this.selectedMusicIds
    ).subscribe({
      next: () => {
        this.selectedMusicIds = []
      },
      error: error => {
        console.log(error)
      }
    })
  }

  selectPlaylist(selected: string) {
    this.selectPlaylistId = selected
  }

  selectAlbum(selected: string) {
    this.selectAlbumId = selected
  }

  addToAlbum() {
    this.albumServices.addMusics(this.selectAlbumId!, this.selectedMusicIds).subscribe({
      next: () => {
        this.selectedMusicIds = []
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
