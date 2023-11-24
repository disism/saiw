import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AlbumService} from "../../services/album.service";
import {RouterLink} from "@angular/router";
import {MusicAlbumObject} from "../../shared/album.model";
import {Observable} from "rxjs";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})

export class AlbumsComponent {

  constructor(
    private albumServices: AlbumService,
    private imageServices: ImageService,
  ) {
  }

  albums$!: Observable<MusicAlbumObject[]>

  ngOnInit() {
    this.getAlbums()
  }

  getAlbums() {
    this.albums$ = this.albumServices.list()
  }

  getImageAddress(cid: string, name: string) {
    return this.imageServices.getAddress(cid)
  }
}
