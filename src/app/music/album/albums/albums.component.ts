import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AlbumService} from "../../../services/album.service";
import {AlbumModel} from "../../../shared/album.model";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {IpfsService} from "../../../services/ipfs.service";
import {MusicTableComponent} from "../../shared/music-table/music-table.component";

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NgOptimizedImage,
    MusicTableComponent
  ],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent {

  albums!: AlbumModel[]

  constructor(
    private albumService: AlbumService,
    private ipfsService: IpfsService,
  ) { }

  ngOnInit() {
    this.getAlbums()
  }

  getAlbums() {
    this.albumService.list().subscribe({
      next: (r) => {
        this.albums = r.albums
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getImageAddress(hash: string) {
    return this.ipfsService.gateway(hash)
  }


}
