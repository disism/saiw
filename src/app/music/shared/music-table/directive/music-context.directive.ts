import {Directive, Input} from '@angular/core';
import {MusicModel} from "../../../../shared/music.model";

@Directive({
  selector: '[musicContext]',
  exportAs: 'musicContext',
  standalone: true
})
export class MusicContextDirective {
  @Input() musicContext!: MusicModel;
}
