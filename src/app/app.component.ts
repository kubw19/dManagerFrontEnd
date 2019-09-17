import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dManagev2';
  private logged: boolean
  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.loginService.checkLogged.subscribe(data => this.logged = (data == "true"))
  }

  

}
