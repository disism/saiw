import { Component } from '@angular/core';
import {PlayerService} from "../../../services/player.service";
import {MusicModel} from "../../../shared/music.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  currentMusic: MusicModel | null = null;
  isPlaying: boolean = false;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.currentMusic$.subscribe(music => {
      this.currentMusic = music;
    });

    this.playerService.isPlaying$.subscribe(status => {
      this.isPlaying = status;
    });
  }

  onPlayPause() {
    this.playerService.togglePlayPause();
  }

  onNext() {
    this.playerService.nextTrack();
  }

  onPrevious() {
    this.playerService.previousTrack();
  }
}
