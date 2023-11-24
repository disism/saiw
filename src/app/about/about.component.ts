import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {VersionObject} from "../shared/version.model";
import {VersionService} from "../services/version.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutComponent {
  title = 'about'

  version$!: Observable<VersionObject>

  constructor(private versionService: VersionService) {}

  ngOnInit() {
    this.version$ = this.versionService.getVersion()
  }
}
