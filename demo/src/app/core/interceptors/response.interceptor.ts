import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError as observableThrowError, } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public toaster: ToastrService,
    // private spinner: NgxSpinnerService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
        //   this.spinner.hide();
        }
      }),
      catchError((error: any, caught: Observable<any>): Observable<HttpErrorResponse | HttpErrorResponse> => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          if (error.error.message) {
            // this.toaster.error(error.error.message, 'Oops!');
          } else {
            // this.toaster.error(error.error, 'Oops!');
          }
        //   this.spinner.hide();
          return observableThrowError(error);
        }
        if (error instanceof HttpErrorResponse && error.status === 401) {
          if (error.error.message) {
            this.toaster.error(error.error.errors[0].detail, 'Oops!');
          } else {
            this.toaster.error(error.error.errors[0].detail, 'Oops!');
          }
        //   this.spinner.hide();
          return observableThrowError(error);
        }
        if (error instanceof HttpErrorResponse && error.status === 403) {
          if (error.error.message) {
            // this.toaster.error(error.error.message, 'Oops!');
          } else {
            // this.toaster.error(error.error, 'Oops!');
          }
        //   this.spinner.hide();
          return observableThrowError(error);
        }
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.router.navigateByUrl('/auth/404');
          this.toaster.error(error.error.message, 'Oops!');
          // this.spinner.hide();
          return observableThrowError(error);
        }
        if (error instanceof HttpErrorResponse && error.status === 500) {
          if (error.error.message) {
            this.toaster.error(error.error.message, 'Oops!');
          } else {
            this.toaster.error(error.error, 'Oops!');
          }
        //   this.spinner.hide();
          return observableThrowError(error);
        }
        if (error instanceof HttpErrorResponse && error.message === 'Http failure response for (unknown url): 0 Unknown Error') {
        //   this.toaster.hide();
          if (error.status === 0) {
            sessionStorage.clear();
          } else {
            sessionStorage.clear();
          }
        }
      }));
  }
}
