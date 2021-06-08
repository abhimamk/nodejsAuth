import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
@Injectable()

export class AuthInterceptor {
    constructor(
        // private spinner: NgxSpinnerService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.spinner.show();
        let headers = new HttpHeaders();
        const token = localStorage.getItem('Token');
        const cookie = localStorage.getItem('cookie');

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Authorization', token);
        headers = headers.set('token', cookie);

        headers = headers.set('Access-Control-Allow-Origin', '*');
        const baseUrl = environment.ip + req.urlWithParams;

        let authenticatedHeader = new HttpHeaders();
        if (!req.headers.has('Content-Type')) {
            authenticatedHeader = authenticatedHeader.set('Content-Type', 'application/json');

        } else {
            req.headers.delete('Content-Type');

        }
        if (req.headers.has('Accept')) {
            authenticatedHeader = authenticatedHeader.set('Accept', 'application/json');

        } else {
            req.headers.delete('Accept');
        }
        if (token) {
            authenticatedHeader = authenticatedHeader.set('Accept', 'application/json');
            authenticatedHeader = authenticatedHeader.set('Authorization', token);
            authenticatedHeader = authenticatedHeader.set('token', cookie);
        } else {
            authenticatedHeader = authenticatedHeader.set('Accept', 'application/json');
            // authenticatedHeader = authenticatedHeader.set('Authorization', token);
            // authenticatedHeader = authenticatedHeader.set('token', cookie);
        }

        const authReq = req.clone({ headers: authenticatedHeader, url: baseUrl });
        return next.handle(authReq);
    }

}
