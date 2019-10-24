import { Injectable, isDevMode } from '@angular/core';
import { Response } from '../classes/Response'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../classes/User'
import { GetService } from './get.service';
import { PutService } from './put.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userId: number
  private sessionId: number
  private logged = new BehaviorSubject('')
  checkLogged = this.logged.asObservable()

  private checkPerf = new BehaviorSubject('')
  checkPerformed = this.checkPerf.asObservable()

  private expiredSubject = new BehaviorSubject(false)
  expiredInfo = this.expiredSubject.asObservable()

  private incorrectLoginSubject = new BehaviorSubject(false)
  incorrectLogin = this.incorrectLoginSubject.asObservable()

  private userSubject = new BehaviorSubject<User>(null)
  user = this.userSubject.asObservable()

  constructor(private httpClient: HttpClient, private cookie: CookieService, private getService: GetService, private putService: PutService) { }

  changeLoggedState(param: string): void {
    this.logged.next(param)
  }

  changeCheckPerformedState(param: string): void {
    this.checkPerf.next(param)
  }

  changeIncorrectLoginState(state: boolean): void {
    this.incorrectLoginSubject.next(state)
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

  login(email: string, password: string): void {
    let loginData = this.httpClient.post<Response>(environment.apiUrl + "/login.php", { "email": email, "password": this.md5(password) })
    loginData.subscribe(data => {
      if (isDevMode()) console.log(data)
      if (data.authorized == true) {
        localStorage.setItem("apiKey", data.apiKey);
        localStorage.setItem("token", this.md5(data.apiKey + data.authKey));
        localStorage.setItem("expire", data.expire);
        this.changeLoggedState("true")
        this.changeCheckPerformedState("true")
        this.userId = data.userId
        this.sessionId = data.sessionId
        this.getService.getUser(this.userId).subscribe(user => {
          this.userSubject.next(user)
          if (isDevMode()) console.log(user)
        })
      }
    },
      (error) => {
        if (isDevMode()) console.log(error)
        if (error.error.authorized == false) {
          this.changeCheckPerformedState("true")
          if (error.error.message == "INCORRECT_DATA" || error.error.message == "WRONG_EMAIL" || error.error.message == "WRONG_PASSWORD") {
            this.changeIncorrectLoginState(true)
          }
          else {
            this.changeIncorrectLoginState(false)
          }
        }
      })
  }

  checkLogin() {
    if (localStorage.getItem("apiKey") && localStorage.getItem("token")) {
      this.httpClient.post<Response>(environment.apiUrl + "/login.php", { "apiKey": localStorage.getItem("apiKey"), "token": localStorage.getItem("token") }).subscribe(
        (data) => {
          if (isDevMode()) console.log(data)
          if (data.authorized == true) {
            this.logged.next("true")
            this.checkPerf.next("true")
            this.userId = data.userId
            this.sessionId = data.sessionId
            this.getService.getUser(this.userId).subscribe(user => {
              this.userSubject.next(user)
              if (isDevMode()) console.log(user)
            })
          }
        },
        (error) => {
          if (isDevMode()) console.log(error.error)
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

  logout(): void {
    this.putService.putJson("/actions.php", { action: "logout", sessionId: this.sessionId }).subscribe(
      data => {
        localStorage.removeItem("apiKey");
        localStorage.removeItem("token");
        localStorage.removeItem("expire");
        this.checkLogin();
      })
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
