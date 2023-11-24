import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicArtistModel } from '../../../shared/music.model';
import { ArtistService } from '../../../services/artist.service';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-artist-manager',
  templateUrl: './artist-manager.component.html',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  styleUrls: ['./artist-manager.component.scss']
})
export class ArtistManagerComponent {
  @Input() currentArtists: MusicArtistModel[] = [];
  @Output() currentArtistsChange = new EventEmitter<MusicArtistModel[]>();
  @Output() addArtistsChange = new EventEmitter<string[]>();
  @Output() removeArtistsChange = new EventEmitter<string[]>();
  searchArtists$!: Observable<MusicArtistModel[]>;
  addArtists: string[] = [];
  removeArtists: string[] = [];

  constructor(private artistService: ArtistService) {}

  searchArtists(name: string) {
    if (name === "") {
      alert("No artist");
      return;
    }
    this.searchArtists$ = this.artistService.search(name);
  }

  createArtist = (name: string) => {
    this.artistService.add(name).subscribe({
      next: (artist) => {
        this.updateArtists(artist, true);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addArtist(artist: MusicArtistModel) {
    this.updateArtists(artist, true);
  }

  removeArtist(artist: MusicArtistModel) {
    this.currentArtists = this.currentArtists.filter(a => a.id !== artist.id);
    this.currentArtistsChange.emit(this.currentArtists);

    if (this.addArtists.includes(artist.id)) {
      this.addArtists = this.addArtists.filter(id => id !== artist.id);
      this.addArtistsChange.emit(this.addArtists); // Ensure to emit changes
    } else {
      if (!this.removeArtists.includes(artist.id)) {
        this.removeArtists.push(artist.id);
        this.removeArtistsChange.emit(this.removeArtists); // Ensure to emit changes
      }
    }
  }

  private updateArtists(artist: MusicArtistModel, isAdding: boolean) {
    const isArtistAlreadyAdded = this.currentArtists.some(a => a.id === artist.id);
    if (isAdding && !isArtistAlreadyAdded) {
      this.currentArtists.push(artist);
      this.currentArtistsChange.emit(this.currentArtists);
      if (!this.addArtists.includes(artist.id)) {
        this.addArtists.push(artist.id);
        this.addArtistsChange.emit(this.addArtists); // Emit changes when adding
      }
    }

    if (!isAdding) {
      this.currentArtists = this.currentArtists.filter(a => a.id !== artist.id);
      this.currentArtistsChange.emit(this.currentArtists);
      if (this.addArtists.includes(artist.id)) {
        this.addArtists = this.addArtists.filter(id => id !== artist.id);
        this.addArtistsChange.emit(this.addArtists); // Emit changes when removing
      } else {
        if (!this.removeArtists.includes(artist.id)) {
          this.removeArtists.push(artist.id);
          this.removeArtistsChange.emit(this.removeArtists); // Emit changes when removing
        }
      }
    }
  }
}
