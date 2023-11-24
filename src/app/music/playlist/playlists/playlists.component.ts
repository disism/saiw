import { Component } from '@angular/core';
import {PlaylistModel} from "../../../shared/playlist.model";
import {PlaylistService} from "../../../services/playlist.service";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {Observable} from "rxjs";
import {IpfsService} from "../../../services/ipfs.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent {

  name!: string
  isPrivate!: boolean
  playlists$!: Observable<PlaylistModel[]>;

  constructor(
    private playlistService: PlaylistService,
    private ipfsService: IpfsService,
    private router: Router
  ) {}

  ngOnInit(){
    this.listPlaylist()
  }

  createPlaylist() {
    this.playlistService.create(this.name, this.isPrivate).subscribe({
      next: (r) => {
        this.router.navigate(["/music/playlist", r.id])
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }

  listPlaylist() {
    this.playlists$ = this.playlistService.list()
  }

  getImageAddress(cid: string, name: string) {
    return this.ipfsService.gateway(cid)
  }

}
