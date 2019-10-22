import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PutService {

  constructor(private http: HttpClient) { }
  addStatistic(type: string, playerId: number, matchId: number): Observable<Object> {
    let options = { "playerId": playerId, "matchId": matchId, "type": type }
    return this.http.put<Object>(environment.apiUrl + "/matches.php", options)
  }

  changePlayed(played: boolean, matchId: number): Observable<Object> {
    let options = { "played": played, "matchId": matchId }
    return this.http.put<Object>(environment.apiUrl + "/matches.php", options)
  }

  putJson(url: string, json: Object): Observable<Object> {
    return this.http.put<Object>(environment.apiUrl + url, json)
  }

  recoverPassword(email: string) {
    const information: JSON = <JSON><unknown>{
      "email": email,
      "action": "passwordRecovery"
    }
    return this.http.put<Object>(environment.apiUrl + "/login.php", information)
  }

}
