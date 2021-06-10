import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private router: Router,
        private http: HttpClient) {
        // router.events
        //   .pipe(filter(event => event instanceof NavigationEnd))
        //   .subscribe((event: NavigationEnd) => {
        //     localStorage.setItem('previousUrlQMS', event.url);
        //   });
    }

    login(instance): Observable<any> {
        return this.http.post<any>(`/users/login`, instance).pipe
            (catchError(this.handelError));
    }

    logout(): Observable<any> {
        const token = localStorage.getItem('Token');
        // let headers = new HttpHeaders();
        // headers = headers.set('Content-Type', 'application/json');
        // headers = headers.set('csrf-token', token);
        // authenticatedHeader = authenticatedHeader.set('Content-Type', 'application/json');
        return this.http.get<any>('/users/logout', );
    }
    //   isLoggedIn(): boolean {
    //     if (!!localStorage.getItem('qmsToken')) {
    //       this.router.navigateByUrl(localStorage.getItem('previousUrlQMS'));
    //       return true;
    //     } else {
    //       this.router.navigate(['auth/login']);
    //       return false;
    //     }
    //   }

    newRegistration(instance): Observable<any> {
        return this.http.post<any>(`/users/register`, instance);
    }

    //   logOutById(userId): any {
    //     this.http.post(`/user/logout`, userId);
    //     // this.cookieService.removeAll();
    //     localStorage.clear();
    //     sessionStorage.clear();
    //     this.router.navigate(['auth/login']);
    //   }

    //   forgotPass(instance): any {
    //     return this.http.post<any>(`/user/forgotPassword`, instance);
    //   }

    //   changePassword(instance): any {
    //     return this.http.post<any>(`/user/resetPassword`, instance);
    //   }


    // Error Handling
    private handelError(errorResponse: HttpErrorResponse): any {
        let customError = 'An unknown error occurred';
        if (!errorResponse.error || !errorResponse.error) {
            return throwError(customError);
        }
        switch (errorResponse.error.errors[0].detail) {
            case 'Email or password is Invalid':
                customError = ' Email or password is Invalid';
                break;
            case 'EMAIL_NOT_FOUND':
                customError = ' The email does not exist';
                break;
            case 'INVALID_PASSWORD':
                customError = ' Password is incorrect';
                break;
            case 'Credential is invalid':
                customError = 'Credential is invalid';
                break;
            case 'Email is already exist!':
                customError = 'Email is already exist!';
        }
        return throwError(customError);
    }

}
