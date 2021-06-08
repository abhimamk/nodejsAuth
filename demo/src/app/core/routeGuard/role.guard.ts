import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'

})
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = localStorage.getItem('Token');
        if (token) {
            return true;
        } else {
            this.router.navigateByUrl('auth/login');
            localStorage.removeItem('Token');
            return false;
        }
    }
}
