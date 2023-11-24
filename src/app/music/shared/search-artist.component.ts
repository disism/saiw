import { Component, Output, EventEmitter } from '@angular/core';
import { Observable, EMPTY } from "rxjs";
import { MusicArtistObject } from "../../shared/music.model";
import { ArtistService } from "../../services/artist.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-artist-search',
  template: `
      <div>
          Artists:
          @if (artists.length > 0) {
              <ul>
                  @for (artist of artists;track artist.id) {
                      <li>
                          {{ artist.name }}
                          <button (click)="removeArtist(artist.id)">Remove</button>
                      </li>
                  }
              </ul>
          }
          <br>

          Search Artist: <input type="text" (keyup.enter)="searchArtists(search.value)" #search>
          @if (searchArtists$ | async;as artists) {
              <button (click)="createArtist(search.value)">No search results for Artist. Created?</button>
              <ul>
                  @for (artist of artists;track artist.id) {
                      <li>
                          {{ artist.name }}
                          <button (click)="addArtist(artist)">Add</button>
                      </li>
                  }
              </ul>
          }
      </div>
  `,
  standalone: true,
  imports: [
    AsyncPipe
  ],
})
export class ArtistSearchComponent {

  @Output() finalArtists = new EventEmitter<MusicArtistObject[]>();

  searchArtists$!: Observable<MusicArtistObject[]>;
  artists: MusicArtistObject[] = [];

  constructor(private artistService: ArtistService) {}

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
      this.artists.push(r)
      this.emitFinalArtists()
    })
  }

  addArtist(artist: MusicArtistObject) {
    this.artists.push(artist)
    this.emitFinalArtists()
  }

  removeArtist(artist_id: string) {
    this.artists = this.artists.filter(artist => artist.id !== artist_id);
    this.emitFinalArtists()
  }

  emitFinalArtists() {
    this.finalArtists.emit(this.artists);
  }
}
