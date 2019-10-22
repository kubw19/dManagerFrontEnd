import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { PutService } from '../../../services/put.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordPlaceholder: string = "Password"
  repeatPasswordPlaceholder: string = "Repeat Password"
  passwordValue: string = ""
  repeatPasswordValue: string = ""
  @Input() recoveryHash: string
  constructor(private loginService: LoginService, private putService: PutService, private router: Router) { }

  ngOnInit() {
  }

  changePassword(){
    if(this.passwordValue == this.repeatPasswordValue && this.passwordValue.length > 0){
      let password = this.loginService.md5(this.passwordValue);
      let repeatPassword = this.loginService.md5(this.repeatPasswordValue);
      this.putService.putJson("/users.php", {"recoveryHash": this.recoveryHash, "password": password, "repeatPassword": repeatPassword}).subscribe(
        data => {window.location.replace(environment.baseHref)}, 
        err => {alert("Passwords do not match or password is empty")}
      )
    }
    else {
      alert("Passwords do not match or password is empty")
    }
  }
}
