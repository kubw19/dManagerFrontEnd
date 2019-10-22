import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from "@angular/router"
import { CookieService } from 'ngx-cookie-service';
import { PutService } from '../../services/put.service';
import {version} from '../../../version'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public versionNumber: string
  @Input() recoveryHash = null
  loginPlaceholder: string = "Email"
  passwordPlaceholder: string = "Password"
  loginValue: string = null
  passwordValue: string = null

  incorrectData: boolean = null
  logged: boolean = false
  checkPerformed: boolean = false
  information: string = ""
  informationType: string = "success"

  forgotten: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private cookie: CookieService, private putService: PutService) { }

  ngOnInit() {
    this.versionNumber = version.number
    this.loginService.checkLogin()
    this.loginService.checkLogged.subscribe(data => this.logged = (data == "true"))
    this.loginService.checkPerformed.subscribe(data => this.checkPerformed = (data == "true"))
    this.loginService.incorrectLogin.subscribe(data => this.incorrectData = data)
    this.loginService.expiredInfo.subscribe(data => {
      if(data){
        this.information = "Your session has expired"
        this.informationType = "warning"
      }
    })
  }

  validateUser(): void {
    this.loginService.login(this.loginValue, this.passwordValue);
  }

  passwordForgotten():void{
    this.forgotten = true;
  }

  sendPasswordRecovery(): void{
    this.information = "Password recovery email sent"
    this.informationType = "success"
    this.forgotten = false

    this.putService.recoverPassword(this.loginValue).subscribe()
  }

}
