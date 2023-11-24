import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {EMPTY, map, Observable} from "rxjs";
import {DirObject, SavedObject} from "../shared/saved.model";
import {DirService} from "../services/dir.service";
import {IpfsService} from "../services/ipfs.service";
import {SavedService} from "../services/saved.service";
import {IPFSObject} from "../shared/ipfs.model";
import {SizePipe} from "../pipes/size.pipe";
import {DirSelectorComponent} from "./shared/dir_selector.component";
import {DownloadButtonComponent} from "./shared/download_button.component";

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SizePipe, DirSelectorComponent, DownloadButtonComponent],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.scss'
})

export class SavedComponent {
  dir$!: Observable<DirObject>
  name!: string
  rename!: string

  uploaded$!: Observable<IPFSObject[]>
  captions: { [key: string]: string } = {};

  editingId!: string

  clearName(): void {
    this.name = '';
  }

  clearRename(): void {
    this.rename = '';
  }

  clearUpload() {
    this.uploaded$ = EMPTY
  }

  constructor(
    private dirService: DirService,
    private route: ActivatedRoute,
    private ipfs: IpfsService,
    private saved: SavedService
  ) {}

  ngOnInit() {
    this.lsDirs()
  }

  getRouteId = (): Observable<string | undefined> => {
    return this.route.params.pipe(
      map(params => params['id'] || undefined)
    );
  }

  lsDirs = () => {
    this.getRouteId().subscribe(id => {
      this.dir$ = this.dirService.ls(id)
    });
  }

  mkDir = () => {
    this.getRouteId().subscribe(id => {
      this.dirService.mk(this.name, id).subscribe({
        next: () => {
          this.clearName()
          this.lsDirs()
        },
        error: (error) => {
          console.log(error)
        }
      });
    });
  };

  renameDir = () => {
    this.getRouteId().subscribe(id => {
      if (id) {
        this.dirService.rename(id, this.rename).subscribe({
          next: () => {
            this.clearRename()
            this.lsDirs()
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    });
  }

  mvDir = (id: string, targetID: string) => {
    this.dirService.mv(id, targetID).subscribe({
      next: (r) => {
        this.lsDirs()
        console.log(r)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  rmDir = (id: string) => {
    this.dirService.rm(id).subscribe({
      next: () => {
        alert("Removed!")
        this.lsDirs()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  onFileSelected(event: any) {
    this.uploaded$ = this.ipfs.add(event.target.files)
  }


  addSaves(uploads: IPFSObject[]) {
    const result: IPFSObject[] = uploads.map(upload => ({
      ...upload,
      caption: this.captions[upload.hash] || ''
    }));

    this.getRouteId().subscribe(id => {
      this.saved.add(result, id).subscribe({
        next: (r) => {
          this.lsDirs()
          this.clearUpload()
        },
        error: (error) => {
          console.log(error)
        }
      })
    })
  }

  removeSavedInDir(saved_id: string) {
    this.getRouteId().subscribe(id => {
      this.saved.unlink(saved_id, id).subscribe({
        next: (r) => {
          this.lsDirs()
          this.clearUpload()
        },
        error: (error) => {
          console.log(error)
        }
      })
    })
  }

  editCaption = (id: string, value: string) => {
    this.saved.edit(id, value).subscribe(r => {
      this.editingId = ""
      this.lsDirs()
    })
  }
}
