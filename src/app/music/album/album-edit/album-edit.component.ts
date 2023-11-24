import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AlbumService} from "../../../services/album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumEditModel, AlbumModel} from "../../../shared/album.model";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ArtistManagerComponent} from "../../shared/artist-manager/artist-manager.component";
import {MusicArtistModel} from "../../../shared/music.model";
import {ImageService} from "../../../services/image.service";
import {IpfsService} from "../../../services/ipfs.service";

@Component({
  selector: 'app-album-edit',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    ArtistManagerComponent,
    NgOptimizedImage
  ],
  templateUrl: './album-edit.component.html',
  styleUrl: './album-edit.component.scss'
})
export class AlbumEditComponent {
  id!: string

  title!: string
  description!: string
  date!: string
  cover_id!: string
  image_url!: string

  addArtists!: string[];
  removeArtists!: string[];
  currentArtists: MusicArtistModel[] = [];


  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private router: Router,
    private imageService: ImageService,
    private ipfsService: IpfsService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getAlbum()
  }

  getAlbum() {
    this.albumService.get(this.id).subscribe({
      next: data => {
        this.title = data.title;
        this.description = data.description;
        this.date = data.date;
        this.currentArtists = data.artists || [];
        this.image_url = this.getImageAddress(data.image.file.hash)
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getImageAddress(hash: string) {
    return this.ipfsService.gateway(hash)
  }

  changeCover(event: any) {
    this.imageService.add(event.target.files).subscribe({
      next: (r) => {
        this.cover_id = r.id;
        this.image_url = this.getImageAddress(r.hash)
      },
      error: (error) => {
        alert("Error")
        console.log(error)
      }
    });
  }

  get formattedDate(): string {
    return this.date ? new Date(parseInt(this.date)).toISOString().split('T')[0] : '';
  }
  set formattedDate(value: string) {
    this.date = new Date(value).getTime().toString();
  }

  deleteAlbum() {
    this.albumService.delete(this.id).subscribe({
      next: data => {
        this.router.navigate(['/music/albums'])
      },
      error: err => {
        alert("Error!");
        console.log(err);
      }
    })
  }

  editAlbum() {
    const raw: AlbumEditModel = {
      title: this.title,
      description: this.description,
      date: this.date,
      cover_id: this.cover_id,
      add_artist_ids: this.addArtists,
      remove_artist_ids: this.removeArtists
    }
    this.albumService.edit(this.id, raw).subscribe({
      next: r => {
        this.router.navigate(['/music/album', r.id])
      },
      error: err => {
        alert("Error!");
        console.log(err);
      }
    })
  }

}
