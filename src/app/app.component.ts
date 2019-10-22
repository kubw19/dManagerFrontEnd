import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './classes/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  date: Date = new Date()
  user: User
  title = 'dManagev2';
  passwordRecovery: boolean = false
  recoveryHash: string
  public logged: boolean
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    setInterval(() => { this.loginService.checkLogin() }, 1000 * 2)
    this.loginService.checkLogged.subscribe(data => this.logged = (data == "true"))
    let url = window.location.toString().split("/");
    if (url.includes("recoverPassword")) {
      this.recoveryHash = url[url.length - 1]
      if(this.recoveryHash != "recoverPassword"){
        this.passwordRecovery = true;
      }
    }
    this.loginService.user.subscribe(user => {
      this.user = user
      console.log(user)
    })
  }

  logout(){
    this.loginService.logout();
  }   

  gotoHomepage(){
    this.router.navigate(["/"]);
  }
 

}
