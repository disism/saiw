import {Component, ElementRef, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import {IpfsService} from "../../services/ipfs.service";

@Component({
  selector: 'app-music-player',
  standalone: true,
  template: `
      <audio #audioPlayer controls></audio>
  `
})
export class MusicPlayerComponent implements AfterViewInit, OnChanges {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  @Input() hash: string = '';

  constructor(private ipfsServices: IpfsService) {
  }

  ngAfterViewInit() {
    this.setAudioSource();
    this.audioPlayer.nativeElement.onended = () => {
      this.audioPlayer.nativeElement.src = '';
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['hash'] && changes['hash'].currentValue) {
      this.setAudioSource();
    }
  }
  private setAudioSource() {
    if (this.audioPlayer && this.hash) {
      this.audioPlayer.nativeElement.src = `${this.ipfsServices.gateway()}/ipfs/${this.hash}`;
    }
  }
}
