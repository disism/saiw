import { Component } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { MusicService } from "../../../services/music.service";
import { EMPTY, Observable } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { MusicArtistObject, MusicObject } from "../../../shared/music.model";
import { FormsModule } from "@angular/forms";
import { ArtistService } from "../../../services/artist.service";

@Component({
  selector: 'app-edit-music',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-music.component.html',
  styleUrl: './edit-music.component.scss'
})
export class EditMusicComponent {
  music$!: Observable<MusicObject>
  artists$!: Observable<MusicArtistObject[]>

  id!: string
  title!: string
  description!: string

  constructor(
    private musicServices: MusicService,
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMusic()
  }

  getMusic() {
    this.route.params.subscribe(params => {
      const id = params['id']
      this.id = id
      this.music$ = this.musicServices.get(id)
    });
  }

  searchArtists(name: string) {
    if (name == "") {
      alert("no artist")
      return
    }
    this.artists$ = this.artistService.search(name)
  }

  addArtist(music_id: string, artist_id: string) {
    const artists = [
      artist_id
    ];

    this.musicServices.addArtists(music_id, artists).subscribe(r => {
      this.artists$ = EMPTY
      this.getMusic()
    })
  }

  removeArtist(music_id: string, artist_id: string) {
    const artists = [
      artist_id
    ];

    this.musicServices.removeArtists(music_id, artists).subscribe(r => {
      this.getMusic()
    })
  }

  createArtist = (music_id: string, name: string) => {
    this.artistService.add(name).subscribe(r => {
      this.addArtist(music_id, r.id)
      this.artists$ = EMPTY
      this.getMusic()
    })
  }

  clearEdit() {
    this.title = ''
    this.description = ''
  }
  edit() {
    if (this.title! || this.description!) {
      this.musicServices.edit(this.id, this.title!, this.description!).subscribe(r => {
        console.log(r)
      })
    }
    this.clearEdit()
    this.router.navigate(['/music/library'])
  }

  cancel() {
    this.clearEdit()
    this.router.navigate(['/music/library'])
  }
}
