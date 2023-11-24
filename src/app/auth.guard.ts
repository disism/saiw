import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const r = inject(Router)
  const token = localStorage.getItem("access_token")

  if (!token && !state.url.startsWith("/authx")) {
    r.navigate(['/authx'])
    return false
  }
  if (token && state.url.startsWith("/authx")) {
    r.navigate(['/'])
    return false
  }

  return true;
};
