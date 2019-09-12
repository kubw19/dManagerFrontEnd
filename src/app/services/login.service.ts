import { Injectable } from '@angular/core';
import { Response } from '../classes/Response'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  logged: boolean = false

  isLogged(): boolean {
    return this.logged;

  }
  login(email: string, password: string): Observable<Response> {
    //let httpParams = new HttpParams();
    //httpParams.set("email", email);
    //httpParams = httpParams.append("password", hash);
    return this.httpClient.post<Response>(environment.apiUrl + "/login.php", { "email": email, "password": this.md5(password) })
    /*    let response = new Response;
        if(login == 'root' && password == 'root'){
          this.logged = true;
          response.id = 0
          response.message = "Success"
        }
        else{
          response.id = 1;
          response.message = "Error"
        }
    
        return response;
        */
  }

  checkLogin() {
    if (this.cookie.get("apiKey") && this.cookie.get("token")) {
      this.httpClient.post<Response>(environment.apiUrl + "/login.php", { "apiKey": this.cookie.get("apiKey"), "token": this.cookie.get("token") }).subscribe(
        (data) => {
          if (data.authorized == true) {
            this.logged = true;
          }
        },
        (error) => {
          this.cookie.delete("apiKey");
          this.cookie.delete("token");
          this.cookie.delete("expire");
        })
    }
  }

  public md5(text: string) {
    let hash = null
    try {
      const md5 = new Md5();
      hash = md5.appendStr(text).end();
    }
    catch{ }
    return hash;
  }


}
