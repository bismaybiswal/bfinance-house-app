import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = window.sessionStorage.getItem('token');
        console.log(`token :: ${token}`)
        if (token !== null) {
            this.authService.verifyToken(token).subscribe(data => {
                if (!data["isValid"]) {
                    this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
                }
            });
        } else {
            this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url } });
        }
        // not logged in so redirect to login page with the return url
        return true;

    }
}