import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private token: TokenService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;

        const token = this.token.getToken();

        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
        }

        return next.handle(authReq).pipe(
            tap(
                () => { },
                (e: any) => {
                    if (e instanceof HttpErrorResponse) {
                        if (e.status == 401) {
                            console.log('HTTP error status 401: sending to login page...');
                            this.token.signOut();
                            this.router.navigateByUrl('/login');
                        }
                    }
                }
            )
        );
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];