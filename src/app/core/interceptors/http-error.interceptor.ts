import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Erro do lado do cliente
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Erro do lado do servidor
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }

        console.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}