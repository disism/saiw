import {Component} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PlaylistModel} from "../../shared/playlist.model";
import {Observable} from "rxjs";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {IpfsService} from "../../services/ipfs.service";
import {MusicTableComponent} from "../shared/music-table/music-table.component";
import {MusicModel} from "../../shared/music.model";
import {FormsModule} from "@angular/forms";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    MusicTableComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

export class PlaylistComponent {
  id!: string
  playlist!: PlaylistModel
  selectedMusicIds: string[] = [];
  playlists$!: Observable<PlaylistModel[]>
  isEditor: boolean = false
  editCoverUrl!: string | undefined
  editCoverId!: string | undefined

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private ipfsService: IpfsService,
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getPlaylist()
  }

  getPlaylist() {
    this.playlistService.get(this.id).subscribe({
      next: (r) => {
        this.playlist = r;
      },
      error: (error) => {
        console.log(error)
        alert("Error!")
      }
    })
  }

  getImageAddress(hash: string) {
    return this.ipfsService.gateway(hash)
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

  removeFromPlaylist() {
    this.playlistService.removeMusics(this.id, this.selectedMusicIds).subscribe({
      next: () => {
        this.getPlaylist()
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }

  goEdit() {
    this.isEditor = true
  }
  editCancel() {
    this.isEditor = false
  }

  editPlaylist() {
    this.playlistService.edit(this.id, this.playlist.name!, this.playlist.description!, this.editCoverId!, this.playlist.private!).subscribe({
      next: (r) => {
        this.getPlaylist()
        this.isEditor = false
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  removeCurrentImage() {
    this.playlistService.removeImage(this.id).subscribe({
      next: () => {
        this.getPlaylist()
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }

  changeCover(event: any) {
    this.imageService.add(event.target.files).subscribe({
      next: (r) => {
        this.editCoverId = r.id;
        this.editCoverUrl = this.getImageAddress(r.hash);
      },
      error: (error) => {
        alert("Error")
        console.log(error)
      }
    });
  }

  deletePlaylist() {
    this.playlistService.delete(this.id).subscribe({
      next: () => {
        this.router.navigate(["music/playlists"])
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }
}
