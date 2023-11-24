import { Component, Input } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-download-button',
  template: `
      <button (click)="download()">Download</button>
  `,
  standalone: true,
})
export class DownloadButtonComponent {
  @Input() hash!: string;

  private gw = environment.ipfs_gateway
  download() {
    window.open(`${this.gw}/ipfs/${this.hash}`, '_blank');
  }
}
