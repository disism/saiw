import { Injectable } from '@angular/core';
import {MusicModel} from "../shared/music.model";
import {BehaviorSubject, of, switchMap} from "rxjs";
import {IpfsService} from "./ipfs.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(
    private ipfsService: IpfsService,
  ) { }

  private playlist = new BehaviorSubject<MusicModel[]>([]);
  private currentIndex = new BehaviorSubject<number | null>(null);
  private isPlaying = new BehaviorSubject<boolean>(false);

  currentMusic$ = this.currentIndex.asObservable().pipe(
    switchMap(index => {
      if (index !== null && this.playlist.value[index]) {
        return of(this.playlist.value[index]);
      }
      return of(null);
    })
  );
  isPlaying$ = this.isPlaying.asObservable();

  private audio: HTMLAudioElement | null = null;

  setPlaylist(musics: MusicModel[], startIndex: number) {
    this.playlist.next(musics);
    this.playMusic(startIndex);
  }

  playMusic(index: number) {
    const music = this.playlist.value[index];
    if (!music) return;

    if (this.audio) {
      this.audio.pause();
    }
    const url = this.ipfsService.gateway(music.file.hash)
    this.audio = new Audio(url);
    this.audio.play().then(() => {
      this.currentIndex.next(index);
      this.isPlaying.next(true);
      this.audio!.onended = () => this.nextTrack();
    }).catch(error => {
      console.error("Error:", error);
    });
  }

  pauseMusic() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying.next(false);
    }
  }

  togglePlayPause() {
    if (this.isPlaying.value) {
      this.pauseMusic();
    } else {
      const currentIndex = this.currentIndex.value;
      if (currentIndex !== null) {
        this.playMusic(currentIndex);
      }
    }
  }

  nextTrack() {
    const nextIndex = (this.currentIndex.value || 0) + 1;
    if (nextIndex < this.playlist.value.length) {
      this.playMusic(nextIndex);
    } else {
      this.isPlaying.next(false);
    }
  }

  previousTrack() {
    const prevIndex = (this.currentIndex.value || 0) - 1;
    if (prevIndex >= 0) {
      this.playMusic(prevIndex);
    }
  }
}
