import {NodeinfoService} from "../services/nodeinfo.service";
import {NodeInfoObject} from "../shared/nodeinfo.model";
import {Observable} from "rxjs";
import {Router, RouterOutlet} from "@angular/router";
import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AuthxService} from "../services/authx.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-authx',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './authx.component.html',
  styleUrl: './authx.component.scss'
})


export class AuthxComponent {

  constructor(
    private nis: NodeinfoService,
    private authx: AuthxService,
    private router: Router,
    private userServices: UserService
  ) {}

  nodes$!: Observable<NodeInfoObject>
  register: boolean = false

  ngOnInit() {
    this.nodes$ = this.nis.getNodeInfo()
  }

  authorize(conf: string, name: string) {
    this.router.navigate([`/authx/${name}`],
      {queryParams: {conf: conf}}
    )
  }

  login(username: string, password: string) {
    this.authx.login(username, password).subscribe({
      next: (r) => {
        localStorage.setItem("access_token", r.access_token)
        this.router.navigate(['/iam'])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  handleRegister(username: string, password: string) {
    this.userServices.register(username, password).subscribe({
      next: (r) => {
        localStorage.setItem("access_token", r.access_token)
        this.router.navigate(['/iam'])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
