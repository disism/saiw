import { Component } from '@angular/core';
import {IpfsService} from "../../services/ipfs.service";
import {MusicService} from "../../services/music.service";
import {MusicExistsModel, MusicModel} from "../../shared/music.model";
import {BehaviorSubject, Observable} from "rxjs";
import {AsyncPipe, SlicePipe} from "@angular/common";
import {SizePipe} from "../../pipes/size.pipe";
import {Router} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";
import {PlaylistModel} from "../../shared/playlist.model";
import {MusicTableComponent} from "../shared/music-table/music-table.component";
import {AlbumModel} from "../../shared/album.model";
import {AlbumService} from "../../services/album.service";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    SlicePipe,
    SizePipe,
    AsyncPipe,
    MusicTableComponent
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  musics$ = new BehaviorSubject<MusicModel[]>([]);
  exists!: MusicExistsModel[];
  selectedMusicIds: string[] = [];
  playlists$!: Observable<PlaylistModel[]>
  albums!: AlbumModel[]

  constructor(
    private router: Router,
    private ipfsService: IpfsService,
    private musicService: MusicService,
    private playlistService: PlaylistService,
    private albumService: AlbumService,
  ) {}

  ngOnInit(): void {
    this.getMusics()
  }

  getMusics() {
    this.musicService.ls().subscribe(musics => {
      this.musics$.next(musics);
    });
  }

  onMusicSelected(event: any) {
    this.ipfsService.add(event.target.files).subscribe(r => {
      this.musicService.add(r).subscribe(add => {
        if (add.exists) {
          this.exists = add.exists;
        }

        if(add.creates) {
          const currentMusics = this.musics$.getValue();
          this.musics$.next([...currentMusics, ...add.creates]);
        }
      })
    })
  }

  saveMusic(music: MusicModel) {
    console.log(music)
    this.musicService.save(music.id).subscribe({
      next: () => {
        const currentMusics = this.musics$.getValue();
        this.musics$.next([...currentMusics, music]);
      },
      error: (error) => {
        if (error.status === 422) {
          alert('The music already exists in the library');
        } else {
          alert("Error!")
          console.log(error)
        }
      }
    })
  }

  completeUpload() {
    this.exists = []
  }

  goEdit(id: string) {
    this.router.navigate(["music/edit", id])
  }

  deleteMusic(id: string) {
    this.musicService.delete(id).subscribe({
      next: () => {
        const currentMusics = this.musics$.getValue();
        this.musics$.next(currentMusics.filter(music => music.id !== id));
      },
      error: error => {
        console.log(error)
      }
    })
  }

  onCheckboxChange(eventData: {event: Event, music: MusicModel}) {
    const { event, music } = eventData;
    if ((event.target as HTMLInputElement).checked) {
      this.selectedMusicIds.push(music.id);
    } else {
      this.selectedMusicIds = this.selectedMusicIds.filter(id => id !== music.id);
    }
  }

  addTo() {
    this.playlists$ = this.playlistService.list()
    this.albumService.list().subscribe({
      next: (r) => {
        this.albums = r.albums
      },
      error: err => {
        console.log(err)
      }
    })
  }

  addToPlaylist(id: string) {
    this.playlistService.addMusics(id, this.selectedMusicIds).subscribe({
      next: () => {
        this.router.navigate(['music/playlist', id])
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }

  addToAlbum(id: string) {
    this.albumService.addMusics(id, this.selectedMusicIds).subscribe({
      next: () => {
        this.router.navigate(['music/album', id])
      },
      error: err => {
        alert("Error!")
        console.log(err)
      }
    })
  }

}
