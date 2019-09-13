import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookie: CookieService, private loginService: LoginService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loginService.logged == true) {
            let cloned = req.clone({
                headers: req.headers.set("APIKEY", "asdlkjasd")
            })

            cloned = cloned.clone({
                headers: cloned.headers.append("TOKEN", "23asdlksdsdjasd")
            }
            )
            return next.handle(cloned)
        }
        else{
            return next.handle(req)
        }
    }
}