import { Injectable } from '@angular/core';
import { Response } from '../classes/Response'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private logged = new BehaviorSubject('')
  checkLogged = this.logged.asObservable()

  private checkPerf = new BehaviorSubject('')
  checkPerformed = this.checkPerf.asObservable()

  private expiredSubject = new BehaviorSubject(false)
  expiredInfo = this.expiredSubject.asObservable()

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  changeLoggedState(param: string): void {
    this.logged.next(param)
  }

  changeCheckPerformedState(param: string): void {
    this.checkPerf.next(param)
  }

  changeExpired(param: boolean): void {
    if (param == true) {
      localStorage.removeItem("apiKey");
      localStorage.removeItem("token");
      localStorage.removeItem("expire");
      this.checkPerf.next("true")
      this.logged.next("false");
    }
    this.expiredSubject.next(param);
  }

  login(email: string, password: string): Observable<Response> {
    return this.httpClient.post<Response>(environment.apiUrl + "/login.php", { "email": email, "password": this.md5(password) })
  }

  checkLogin() {
    if (localStorage.getItem("apiKey") && localStorage.getItem("token")) {
      this.httpClient.post<Response>(environment.apiUrl + "/login.php", { "apiKey": localStorage.getItem("apiKey"), "token": localStorage.getItem("token") }).subscribe(
        (data) => {
          //console.log(data)
          if (data.authorized == true) {
            this.logged.next("true")
            this.checkPerf.next("true")
          }
          console.log(data)
        },
        (error) => {
          console.log(error.error)
          //this.changeExpired(true)
          this.checkPerf.next("true")
          this.logged.next("false");
          if (error.error.message == "Expired") {
            this.changeExpired(true);
          }
        })
    }
    else {
      this.checkPerf.next("true")
      this.logged.next("false");
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
