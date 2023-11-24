import { Component } from '@angular/core';
import {AlbumService} from "../../../services/album.service";
import {Router} from "@angular/router";
import {ArtistManagerComponent} from "../../shared/artist-manager/artist-manager.component";
import {AlbumCreateModel} from "../../../shared/album.model";
import {FormsModule} from "@angular/forms";
import {ImageService} from "../../../services/image.service";
import {IpfsService} from "../../../services/ipfs.service";

@Component({
  selector: 'app-album-create',
  standalone: true,
  imports: [
    ArtistManagerComponent,
    FormsModule
  ],
  templateUrl: './album-create.component.html',
  styleUrl: './album-create.component.scss'
})
export class AlbumCreateComponent {

  title!: string
  date!: string
  artists!: string[]
  coverId!: string
  description!: string
  coverUrl!: string

  constructor(
    private albumService: AlbumService,
    private imageService: ImageService,
    private ipfsService: IpfsService,
    private router: Router,
  ) {}


  getImageAddress(hash: string) {
    return this.ipfsService.gateway(hash)
  }


  uploadCover(event: any) {
    this.imageService.add(event.target.files).subscribe({
      next: (r) => {
        this.coverId = r.id;
        this.coverUrl = this.getImageAddress(r.hash);
      },
      error: (error) => {
        alert("Error")
        console.log(error)
      }
    });
  }

  createAlbum()  {
    const raw: AlbumCreateModel = {
      title: this.title,
      date: new Date(this.date).getTime().toString(),
      artist_ids: this.artists,
      cover_id: this.coverId,
      description: this.description,
    }
    this.albumService.create(raw).subscribe({
      next: (res) => {
        this.router.navigate(['/music/albums']);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
