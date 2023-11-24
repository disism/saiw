import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const r = inject(Router)
  const token = localStorage.getItem("access_token")

  // If the token does not exist and is not about,jump to the about page.
  if (!token && !state.url.startsWith("/auth")) {
    r.navigate(['/auth'])
    return false
  }

  // If the token exists and is in the auth page, jump to the home page.
  if (token && state.url.startsWith("/auth")) {
    r.navigate(['/'])
    return false
  }

  return true;
};
