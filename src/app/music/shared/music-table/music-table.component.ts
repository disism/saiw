import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {NgTemplateOutlet, SlicePipe} from "@angular/common";
import {MusicModel} from "../../../shared/music.model";
import {MusicContextDirective} from "./directive/music-context.directive";
import {PlayerService} from "../../../services/player.service";

@Component({
  selector: 'app-music-table',
  standalone: true,
  imports: [
    SlicePipe,
    MusicContextDirective,
    NgTemplateOutlet
  ],
  templateUrl: './music-table.component.html',
  styleUrl: './music-table.component.scss'
})
export class MusicTableComponent {
  @Input() musics!: MusicModel[];
  @Output() selectedMusic = new EventEmitter<{event: Event, music: MusicModel}>();
  @ContentChild('musicOptionsTemplate') musicOptionsTemplate!: TemplateRef<any>;


  onCheckboxChange(event: Event, music: MusicModel): void {
    this.selectedMusic.emit({event, music});
  }

  constructor(
    private playerService: PlayerService,
  ) {
  }
  play(selectedMusic: MusicModel) {
    const startIndex = this.musics.findIndex(music => music.id === selectedMusic.id);
    if (startIndex !== -1) {
      this.playerService.setPlaylist(this.musics, startIndex);
    }
  }
}
