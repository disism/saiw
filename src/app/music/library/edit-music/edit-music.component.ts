import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { MusicService } from "../../../services/music.service";
import { Observable } from "rxjs";
import {MusicArtistModel, MusicEditModel, MusicModel} from "../../../shared/music.model";
import { FormsModule } from "@angular/forms";
import { AsyncPipe } from "@angular/common";
import {ArtistManagerComponent} from "../../shared/artist-manager/artist-manager.component";

@Component({
  selector: 'app-edit-music',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    ArtistManagerComponent,
  ],
  templateUrl: './edit-music.component.html',
  styleUrls: ['./edit-music.component.scss']
})
export class EditMusicComponent {

  id!: string;
  music$!: Observable<MusicModel>;
  name!: string;
  description!: string;
  addArtists!: string[];
  removeArtists!: string[];
  currentArtists: MusicArtistModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getMusic();
  }

  getMusic() {
    this.music$ = this.musicService.get(this.id);
    this.music$.subscribe(music => {
      this.name = music.name;
      this.description = music.description;
      this.currentArtists = music.artists || [];
    });
  }

  onSubmit() {
    const edit: MusicEditModel = {
      name: this.name,
      description: this.description,
      add_artists: this.addArtists!,
      remove_artists: this.removeArtists!
    }
    this.musicService.edit(this.id, edit).subscribe({
      next: (r) => {
        this.router.navigate(['music/library'])
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }
}
