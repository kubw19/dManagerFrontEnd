import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPlaceholder:string = "Login"
  passwordPlaceholder:string = "Password"


  constructor() { }

  ngOnInit() {
  }

  validateUser():void{
    alert("Błędne dane!")
  }

}
