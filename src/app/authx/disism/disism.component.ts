import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OidcService} from "../../services/oidc.service";
import {environment} from "../../../environments/environment";
import {switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthSessionObject} from "../../shared/authx.model";
import {OpenIDConfigurationObject} from "../../shared/openid.model";
import {AuthxService} from "../../services/authx.service";
import {generateCodeChallenge, random} from "../shared/helper";

@Component({
  selector: 'app-disism',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disism.component.html',
  styleUrl: './disism.component.scss'
})

// disism.component.ts
export class DisismComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private oidc: OidcService,
    private authx: AuthxService,
  ) {}

  provider!: OpenIDConfigurationObject
  conf!: string
  code!: string

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      tap(params => this.handleQueryParams(params)),
      switchMap(params => this.discoverProvider()),
      tap(r => this.handleProvider(r)),
      tap(() => this.handleCode())
    ).subscribe();
  }

  handleQueryParams(params: Params) {
    this.conf = params['conf'];
    this.code = params['code'];
  }

  discoverProvider(): Observable<OpenIDConfigurationObject | null> {
    if (this.conf) {
      return this.oidc.discover(this.conf);
    } else {
      return of(null);
    }
  }

  async handleProvider(r: OpenIDConfigurationObject | null) {
    if (r) {
      this.provider = r

      const verifier = random(128);
      const scope = 'openid profile email';
      const challenge = await generateCodeChallenge(verifier);

      const p: Record<string, string> = {
        response_type: 'code',
        client_id: environment.disism_oidc_client_id,
        scope,
        redirect_uri: environment.disism_oidc_callback_uri,
        code_challenge_method: 'S256',
        code_challenge: challenge
      };

      sessionStorage.setItem("disism_auth", JSON.stringify({
        "challenge_verifier": verifier,
        "provider": r
      }))

      window.location.href = `${r.authorization_endpoint}?${new URLSearchParams(p)}`
    }
  }

  handleCode() {
    if (this.code) {
      const a = sessionStorage.getItem("disism_auth");
      const v: AuthSessionObject = JSON.parse(a!)

      this.oidc.getToken(
        v?.provider.token_endpoint!,
        environment.disism_oidc_client_id,
        environment.disism_oidc_client_secret,
        this.code,
        environment.disism_oidc_callback_uri,
        v?.challenge_verifier!
      ).pipe(
        switchMap(r => this.authx.authn(r.id_token))
      ).subscribe(r => {
        localStorage.setItem("access_token", r.access_token)
        sessionStorage.removeItem("disism_auth")
        this.router.navigate(['/']);
      });
    }
  }
}
