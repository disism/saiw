import { Component, Output, EventEmitter } from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-image-upload',
  template: `
      <input type="file" (change)="onFileSelected($event)">
  `,
  standalone: true
})
export class ImageUploadComponent {
  @Output() imageIdChanged = new EventEmitter<string>();

  constructor(private imageService: ImageService) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.imageService.add(files).subscribe({
        next: (response: any) => {
          alert('ADD IMAGES SUCCESS');
          this.imageIdChanged.emit(response.id);
        },
        error: (error: any) => {
          console.log(error);
          alert('ADD IMAGES ERROR!');
        },
      });
    }
  }
}
