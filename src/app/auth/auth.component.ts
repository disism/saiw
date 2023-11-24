import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AboutComponent} from "../about/about.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    AboutComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isCreate: boolean = false

  constructor(
    private auth: AuthService,
    private user: UserService,
    private router: Router,
  ) { }

  login(username: string, password: string) {
    this.auth.login(username, password).subscribe({
      next: (r) => {
        localStorage.setItem("access_token", r.access_token)
        this.router.navigate(['/'])
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }

  create(username: string, password: string) {
    this.user.create(username,password).subscribe({
      next: (r) => {
        localStorage.setItem("access_token", r.access_token)
        this.router.navigate(['/'])
      },
      error: (error) => {
        alert("Error!")
        console.log(error)
      }
    })
  }

}
