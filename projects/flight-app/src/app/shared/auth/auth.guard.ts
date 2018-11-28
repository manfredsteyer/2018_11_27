import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService) {
    }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        if (this.authService.userName) {
            return true;
        }
        this.router.navigate(['/home', { needsLogin: true }])
        return false;
    }

}