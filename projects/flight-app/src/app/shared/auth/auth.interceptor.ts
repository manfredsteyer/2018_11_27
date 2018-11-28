import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable(
// New syntax does not work for Interceptors
// {
//     providedIn: 'root'
// }
)
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('http://www.angular.at/api')) {
            const headers = req.headers.set('Authorization', 'TOKEN asdfsadf32cd==');
            req = req.clone({ headers });
        }

        return next.handle(req).pipe(
          catchError(err => this.handleError(err))  
        );
    }

    handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        
        if (err.status === 401 || err.status === 403) {
            // 401: Unauthorized
            // 403: Forbidden
            this.router.navigate(['/home', {needsLogin: true}])
        }

        return throwError(err);
    }

}