import { Component } from '@angular/core';
import {MusicTableComponent} from "../shared/music-table/music-table.component";
import {AlbumService} from "../../services/album.service";
import {MusicModel} from "../../shared/music.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumModel} from "../../shared/album.model";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {IpfsService} from "../../services/ipfs.service";

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    MusicTableComponent,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {
  id!: string
  album!: AlbumModel
  selectedMusicIds: string[] = []

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private ipfsService: IpfsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getAlbum()
  }

  getAlbum() {
    this.albumService.get(this.id).subscribe({
      next: (res) => {
        this.album = res;
      },
      error: err => {
        alert("Error!");
        console.log(err);
      }
    })
  }

  getImageAddress(hash: string) {
    return this.ipfsService.gateway(hash)
  }

  onCheckboxChange(eventData: {event: Event, music: MusicModel}) {
    const { event, music } = eventData;
    if ((event.target as HTMLInputElement).checked) {
      this.selectedMusicIds.push(music.id);
    } else {
      this.selectedMusicIds = this.selectedMusicIds.filter(id => id !== music.id);
    }
  }

  removeFormAlbum() {
    this.albumService.removeMusics(this.id, this.selectedMusicIds).subscribe({
      next: (res) => {
        this.getAlbum()
        this.selectedMusicIds = []
      },
      error: err => {
        alert("Error!");
        console.log(err);
      }
    })
  }

  goEdit() {
    this.router.navigate(['/music/album/edit', this.id]);
  }
}
