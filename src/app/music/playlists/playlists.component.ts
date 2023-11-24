import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Observable} from "rxjs";
import {PlaylistObject} from "../../shared/playlist.model";
import {PlaylistService} from "../../services/playlist.service";
import {IpfsService} from "../../services/ipfs.service";
import {RouterLink} from "@angular/router";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent {
  playlists$!: Observable<PlaylistObject[]>
  constructor(
    private playlistServices: PlaylistService,
    private imageServices: ImageService
  ) {}

  ngOnInit() {
    this.getPlaylists()
  }

  getPlaylists() {
    this.playlists$ = this.playlistServices.list()
  }

  getImageAddress(cid: string, name: string) {
    return this.imageServices.getAddress(cid)
  }

}
