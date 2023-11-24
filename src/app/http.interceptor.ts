import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!(req.body instanceof FormData)) {
    const modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });
    return next(modifiedReq);
  } else {
    return next(req);
  }
};
