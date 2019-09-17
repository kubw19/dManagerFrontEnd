import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "./login.service";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookie: CookieService, private loginService: LoginService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (localStorage.getItem("apiKey") != null && localStorage.getItem("token") != null) {
            let cloned = req.clone({
                headers: req.headers.set("APIKEY", localStorage.getItem("apiKey"))
            })

            cloned = cloned.clone({
                headers: cloned.headers.append("TOKEN", localStorage.getItem("token"))
            }
            )
            return next.handle(cloned).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.error.message == "Expired") {
                        this.loginService.changeExpired(true);
                    }
                    return throwError(error)
                }))
        }
        else {
            return next.handle(req)
        }
    }
}