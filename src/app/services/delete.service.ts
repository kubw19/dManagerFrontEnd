import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import {Response} from '../classes/Response'
import { Contest } from '../classes/Contest';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) { }

  delete(id: number, url: string){
    let httpParams = new HttpParams().set('delete', 'true');
    httpParams = httpParams.append('id', id.toString())
    let options = { params: httpParams };
    return this.http.get(environment.apiUrl + url, options)
  }

}
