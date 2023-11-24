import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)

  const token = localStorage.getItem("access_token")

  if (req.headers.has('Skip-Interceptor')) {
    const headers = req.headers.delete('Skip-Interceptor');
    return next(req.clone({ headers }));
  }

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
        console.log(error)
        if (error.status === 401) {
          localStorage.removeItem("access_token")
          router.navigate(["/authx"])
        }
        return throwError(() => error);
      }
    ));
};
