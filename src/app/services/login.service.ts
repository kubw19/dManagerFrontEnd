import { Injectable } from '@angular/core';
import {Response} from '../classes/Response'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  logged: boolean = true

  isLogged():boolean{
    return this.logged;
  }
  checkLogin(login: string, password:string):Response{
    let response = new Response;
    if(login == 'root' && password == 'root'){
      this.logged = true;
      response.id = 0
      response.message = "Success"
    }
    else{
      response.id = 1;
      response.message = "Error"
    }

    return response;
  }

}
