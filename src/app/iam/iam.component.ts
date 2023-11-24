import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-iam',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './iam.component.html',
  styleUrl: './iam.component.scss'
})
export class IamComponent {

  constructor(
    private router: Router
  ) {}

  logout() {
    localStorage.removeItem("access_token")
    this.router.navigate(["/authx"])
  }
}
