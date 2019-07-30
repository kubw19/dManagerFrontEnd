import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contest } from '../classes/Contest'

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) { }

  getContests():Observable<Contest[]>{
    return this.http.get<Contest[]>("http://192.168.0.59/dManagerBackend/contests.php");
  }

}
