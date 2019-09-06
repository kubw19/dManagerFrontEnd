import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contest } from '../classes/Contest'
import {Stadium} from '../classes/Stadium'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GetService {
  constructor(private http: HttpClient) { }

  getContests():Observable<Contest[]>{
    return this.http.get<Contest[]>(environment.apiUrl + "/contests.php");
  }

  getContest(id: number):Observable<Contest>{
    return this.http.get<Contest>(environment.apiUrl + "/contests.php?id=" + id);
  }

  getPhases(contestId: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/phases.php?contestId=" + contestId);
  }

  getPhase(id: number):Observable<Object>{
    return this.http.get<Object>(environment.apiUrl + "/phases.php?id=" + id);
  }

  getGroups(phaseId: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/groups.php?phaseId=" + phaseId);
  }

  getGroup(id: number):Observable<Object>{
    return this.http.get<Object>(environment.apiUrl + "/groups.php?id=" + id);
  }

  getStadiums():Observable<Stadium[]>{
    return this.http.get<Stadium[]>(environment.apiUrl + "/stadiums.php");
  }

  getMatchesByGroup(id: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/matches.php?groupId=" + id);
  }
  getMatchesByPhase(id: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/matches.php?phaseId=" + id);
  }

  getPlayersByCountry(id: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/players.php?country=" + id);
  }

  getCountries():Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/countries.php");
  }

}
