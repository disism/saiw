import { Component } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'saiw';
  homepage = false

  constructor(
    private location: Location
  ) {}

  goBack = () => {
    this.location.back()
  }
}
