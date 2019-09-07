import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PutService {

  constructor(private http: HttpClient) { }
  addStatistic(type: string, playerId: number, matchId: number):Observable<Object>{
    let options = {"playerId": playerId, "matchId": matchId, "type": type}
    return this.http.put<Object>(environment.apiUrl + "/matches.php", options)
  }
}
