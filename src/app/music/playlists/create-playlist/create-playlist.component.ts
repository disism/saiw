import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ImageService} from "../../../services/image.service";
import {PlaylistService} from "../../../services/playlist.service"
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.scss'
})
export class CreatePlaylistComponent {

  name!: string
  description!: string
  imageId!: string
  isPrivate!: string

  constructor(
    private imageServices: ImageService,
    private playlistServices: PlaylistService,
    private router: Router
  ) {}


  uploadImage(event: any) {
    this.imageServices.add(event.target.files).subscribe({
      next: (r) => {
        {
          console.log(r)
          alert("ADD IMAGES SUCCESS")
          this.imageId = r.id
        }
      },
      error: (error) => {
        console.log(error)
        alert("ADD IMAGES ERROR!")
      }
    });
  }

  createPlaylist() {
    this.playlistServices.create(this.name, this.description, this.imageId, this.isPrivate).subscribe({
      next: () => {
        this.router.navigate(["/music/playlists"])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
