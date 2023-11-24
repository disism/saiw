import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SavedService} from "../../services/saved.service";
import {Observable} from "rxjs";
import {SavedObject} from '../../shared/saved.model';
import {SizePipe} from "../../pipes/size.pipe";
import {FormsModule} from "@angular/forms";
import {DirSelectorComponent} from "../shared/dir_selector.component";
import {DownloadButtonComponent} from "../shared/download_button.component";

@Component({
  selector: 'app-saves',
  standalone: true,
  imports: [CommonModule, SizePipe, FormsModule, DirSelectorComponent, DownloadButtonComponent],
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.scss'
})

export class SavesComponent {

  saves$!: Observable<SavedObject[]>

  constructor(
    private savedServices: SavedService,
  ) {}

  ngOnInit() {
    this.ls()
  }

  ls() {
    this.saves$ = this.savedServices.ls()
  }

  delete(id: string) {
    this.savedServices.rm(id).subscribe({
      next: (r) => {
        console.log(r)
        this.ls()
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

  addToDir(saved_id: string, dir_id: string) {
    this.savedServices.link(saved_id, dir_id).subscribe(r => {
      console.log(r)
    })
  }

}
