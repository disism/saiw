import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  nav = [
    { path: '/', name: 'Home'},
    { path: '/iam', name: 'IAm'},
    { path: '/about', name: 'About'},
  ]
}
