import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from "@angular/router"
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPlaceholder: string = "Login"
  passwordPlaceholder: string = "Password"
  loginValue: string = null
  passwordValue: string = null

  incorrectData: boolean = null
  logged: boolean = false
  checkPerformed: boolean = false
  expired: boolean = false

  constructor(private loginService: LoginService, private router: Router, private cookie: CookieService) { }

  ngOnInit() {
    this.loginService.checkLogin()
    this.loginService.checkLogged.subscribe(data => this.logged = (data == "true"))
    this.loginService.checkPerformed.subscribe(data => this.checkPerformed = (data == "true"))
    this.loginService.expiredInfo.subscribe(data => this.expired = data)
  }

  validateUser(): void {
    this.loginService.login(this.loginValue, this.passwordValue).subscribe((data) => {
      console.log(data)
      if (data.authorized == true) {
        //t//his.loginService.logged = true;
        localStorage.setItem("apiKey", data.apiKey);
        localStorage.setItem("token", this.loginService.md5(data.apiKey + data.authKey));
        localStorage.setItem("expire", data.expire);
        this.loginService.changeLoggedState("true")
        this.loginService.changeCheckPerformedState("true")
        setInterval(() => {this.loginService.checkLogin()}, 1000 * 10)
      }
    },
      (error) => {
        console.log(error)
        if (error.error.authorized == false) {
          this.loginService.changeCheckPerformedState("true")
          if (error.error.message == "INCORRECT_DATA" || error.error.message == "WRONG_EMAIL" || error.error.message == "WRONG_PASSWORD") {
            this.incorrectData = true;
          }
          else {
            this.incorrectData = false;
          }
        }
      });

  }

}
