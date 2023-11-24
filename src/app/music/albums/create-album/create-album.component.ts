import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MusicArtistObject} from "../../../shared/music.model";
import {AlbumService} from "../../../services/album.service";
import {Router} from "@angular/router";
import {ArtistSearchComponent} from "../../shared/search-artist.component";
import {ImageService} from "../../../services/image.service";
import {ImageUploadComponent} from "../../shared/upload-image.component";

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ArtistSearchComponent, ImageUploadComponent],
  templateUrl: './create-album.component.html',
  styleUrl: './create-album.component.scss'
})
export class CreateAlbumComponent {

  title!: string
  description!: string
  year!: string
  imageId!: string

  artists: MusicArtistObject[] = [];

  constructor(
    private albumServices: AlbumService,
    private router: Router,
  ) {}

  onImageIdChanged(id: string) {
    this.imageId = id;
  }
  createAlbum() {
    if (!this.title) {
      alert("Title Is Required!")
      return
    }
    if (!this.year) {
      alert("Year Is Required!")
    } else {
      const regex = /^\d{4}$/;
      if (!regex.test(this.year)) {
        alert("Invalid Year Format!");
        return;
      }
    }
    if (!this.imageId) {
      alert("Image Is Required!")
    }
    this.albumServices.create(
      this.title,
      this.imageId,
      this.year,
      this.description,
      this.artists
    ).subscribe({
      next: () => {
        this.router.navigate(['/music/albums'])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  handleFinalArtists(artists: MusicArtistObject[]) {
    this.artists = artists
  }

}

