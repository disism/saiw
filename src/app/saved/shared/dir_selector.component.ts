import {Component, EventEmitter, Input, Output} from '@angular/core';
import { DirService } from "../../services/dir.service";
import { Observable } from "rxjs";
import { DirObject } from '../../shared/saved.model';
import {AsyncPipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-dir-selector',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  template: `
      <button (click)="selectDir()">Add To</button>
      @if (dirs$ | async;as dirs) {
          <select #items (change)="selectedDir(items.value)">
              <option value=""></option>
              @for (dir of dirs;track dir.id) {
                  <option [value]="dir.id">{{ dir.name }}</option>
              }
          </select>
      }
  `
})
export class DirSelectorComponent {
  @Input() id!: string;
  @Output() dirSelected = new EventEmitter<string>();
  dirs$!: Observable<DirObject[]>;

  constructor(private dirServices: DirService) {}

  selectDir() {
    this.dirs$ = this.dirServices.all();
  }
  selectedDir(dirId: string) {
    this.dirSelected.emit(dirId);
  }
}
