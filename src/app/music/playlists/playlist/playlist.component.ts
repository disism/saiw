import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, Location, NgOptimizedImage} from '@angular/common';
import {PlaylistService} from "../../../services/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ImageService} from "../../../services/image.service";
import {PlaylistObject} from "../../../shared/playlist.model";
import {FormsModule} from "@angular/forms";
import {IpfsService} from "../../../services/ipfs.service";
import {SizePipe} from "../../../pipes/size.pipe";
import {MusicPlayerComponent} from "../../shared/play.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, SizePipe, MusicPlayerComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

  constructor(
    private playlistServices: PlaylistService,
    private route: ActivatedRoute,
    private imageServices: ImageService,
    private location: Location,
    private ipfsServices: IpfsService
  ) {}

  playlist$!: Observable<PlaylistObject>
  isEditor: boolean = false
  isEditorImage: boolean = false
  editImgUrl!: string
  name!: string
  description!: string
  isPrivate!: string
  editImageId!: string
  id!: string

  ngOnInit() {
    this.getParamsId()
    this.getPlaylist()
  }

  getParamsId() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
  }

  getPlaylist() {
    this.playlist$ = this.playlistServices.getPlaylist(this.id)
    this.playlist$.subscribe(r => {
      console.log(r)
    })
  }

  getImageAddress(cid: string) {
    const addr = this.imageServices.getAddress(cid)
    this.editImgUrl = addr
    return addr
  }

  deletePlaylist(id: string) {
    this.playlistServices.delete(id).subscribe({
      next: () => {
        this.location.back()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  editImage(event: any) {
    this.imageServices.add(event.target.files).subscribe({
      next: (r) => {
        {
          alert("EDIT IMAGES SUCCESS")
          this.editImageId = r.id
          this.editImgUrl = this.imageServices.getAddress(r.file.hash)
        }
      },
      error: (error) => {
        console.log(error)
        alert("EDIT IMAGES ERROR!")
      }
    });
  }

  editPlaylist() {
    if (this.name! || this.description! || this.isPrivate!) {
      this.playlistServices.editPlaylist(
        this.id!,
        this.name!,
        this.description!,
        this.isPrivate!,
      ).subscribe(r => {
        console.log(r)
      })
    } else {
      alert("NO CHANGE!")
    }

    this.isEditor = false
    this.getPlaylist()

  }

  editPlaylistImage() {
    if (this.editImageId!) {
      this.playlistServices.editPlaylistImage(this.id, this.editImageId).subscribe(r => {
        console.log(r)
      })
    }
    this.clearEdit()
    this.isEditorImage = false
    this.getPlaylist()
  }

  clearEdit() {
    this.name = '';
    this.description = '';
    this.isPrivate = '';
    this.editImageId = '';
  }


  editCancel() {
    this.isEditor = false
    this.isEditorImage = false
    this.clearEdit()
  }

  removeCurrentImage() {
   this.playlistServices.removePlayListImage(this.id).subscribe(r => {
     console.log(r)
   })
    this.editImgUrl = ''
    this.isEditorImage = false
    this.getPlaylist()
  }


  removeMusicFromPlaylist(music_id: string) {
    this.playlistServices.removeMusics(this.id, [music_id]).subscribe(r => {
      console.log(r)
      this.getPlaylist()
    })
  }


}
