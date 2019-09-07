import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import {Response} from '../classes/Response'
import { Contest } from '../classes/Contest';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  postJSON(json: string, url: string){
    return this.http.post(environment.apiUrl + url, json);
  }

  addContest(contest: Object):Observable<Object>{
    return this.http.post<Object>(environment.apiUrl + "/contests.php", contest);
  }

}
