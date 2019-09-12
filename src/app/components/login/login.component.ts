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

  incorrectData: boolean = false


  constructor(private loginService: LoginService, private router: Router, private cookie: CookieService) { }

  ngOnInit() {
    this.loginService.checkLogin()
  }

  validateUser(): void {
    this.loginService.login(this.loginValue, this.passwordValue).subscribe((data) => {
      if (data.authorized == true) {
        this.loginService.logged = true;
        this.cookie.set("apiKey", data.apiKey);
        this.cookie.set("token", this.loginService.md5(data.apiKey + data.authKey));
        this.cookie.set("expire", data.expire);
      }
    },
      (error) => {
        if (error.error.authorized == false) {
          this.loginService.logged = false;
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
