import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service'
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPlaceholder:string = "Login"
  passwordPlaceholder:string = "Password"
  loginValue: string
  passwordValue: string

  incorrectData: boolean


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  validateUser():void{
    if(this.loginService.checkLogin(this.loginValue, this.passwordValue).id == 1){
      this.incorrectData = true;
      }
    else{
        this.incorrectData = false;
    }
  }

}
