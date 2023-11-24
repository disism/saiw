import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumService} from "../../../services/album.service";
import {EMPTY, Observable} from "rxjs";
import {MusicAlbumObject} from "../../../shared/album.model";
import {ImageService} from "../../../services/image.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MusicArtistObject} from "../../../shared/music.model";
import {ImageUploadComponent} from "../../shared/upload-image.component";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ArtistSearchComponent} from "../../shared/search-artist.component";
import {ArtistService} from "../../../services/artist.service";

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule, FormsModule, ImageUploadComponent, ArtistSearchComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {

  id!: string
  album!: MusicAlbumObject
  isEdit: boolean = false
  title!: string
  description!: string
  year!: string
  imageId!: string

  artists: MusicArtistObject[] = [];
  searchArtists$!: Observable<MusicArtistObject[]>;

  constructor(
    private route: ActivatedRoute,
    private albumServices: AlbumService,
    private imageServices: ImageService,
    private router: Router,
    private artistService: ArtistService
  ) {
  }

  ngOnInit() {
    this.getParamsId()
    this.getAlbum()
  }

  getParamsId() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
  }

  getAlbum() {
    this.albumServices.get(this.id).subscribe(r => {
      this.album = r
    })
  }

  getImageAddress(cid: string, name: string) {
    return this.imageServices.getAddress(cid)
  }

  onImageIdChanged(id: string) {
    this.imageId = id;
  }

  editAlbum() {

    if (this.year) {
      const regex = /^\d{4}$/;
      if (!regex.test(this.year)) {
        alert("Invalid Year Format!");
        return;
      }
    }
    if (
      !this.title &&
      !this.imageId &&
      !this.year &&
      !this.description &&
      (!this.artists || this.artists.length === 0)
    ){
      alert('No Changed!');
      return;
    }

    this.albumServices.edit(this.id, this.title, this.imageId, this.year, this.description).subscribe({
      next: (r) => {
        this.isEdit = false
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.getAlbum()
  }

  deleteAlbum(album_id: string) {
    this.albumServices.delete(album_id).subscribe({
      next: () => {
        this.router.navigate(['music/albums'])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  searchArtists(name: string) {
    if (name == "") {
      alert("no artist")
      return
    }
    this.searchArtists$ = this.artistService.search(name)
  }

  createArtist = (name: string) => {
    this.artistService.add(name).subscribe(r => {
      this.searchArtists$ = EMPTY
      this.albumServices.addArtist(this.id, r.id).subscribe({
        next: () => {
          this.getAlbum()
        },
        error: (error) => {
          console.log(error)
        }
      })
    })
  }

  addArtist(artist: MusicArtistObject) {
    this.albumServices.addArtist(this.id, artist.id).subscribe({
      next: () => {
        this.getAlbum()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  removeArtist(artist_id: string) {
    console.log(artist_id)
    this.albumServices.removeArtist(this.id, artist_id).subscribe({
      next: () => {
        this.getAlbum()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  removeMusicFromAlbum(music_id: string) {
    this.albumServices.removeMusics(this.id, [music_id]).subscribe(r => {
      console.log(r)
      this.getAlbum()
    })
  }
}
