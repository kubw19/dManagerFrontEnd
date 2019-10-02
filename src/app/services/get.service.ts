import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contest } from '../classes/Contest'
import {Stadium} from '../classes/Stadium'
import {environment} from '../../environments/environment'
import { Player } from '../classes/Player';

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

  getMatch(id: number):Observable<Match>{
    return this.http.get<Match>(environment.apiUrl + "/matches.php?matchId=" + id);
  }

  getMatchesByGroup(id: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/matches.php?groupId=" + id);
  }
  getMatchesByPhase(id: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/matches.php?phaseId=" + id);
  }

  getPlayersByCountry(id: number):Observable<Player[]>{
    return this.http.get<Player[]>(environment.apiUrl + "/players.php?countryId=" + id);
  }

  getCountries():Observable<Country[]>{
    return this.http.get<Country[]>(environment.apiUrl + "/countries.php");
  }

  getCountriesAtContest(contest: number):Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/humanPlayers.php?contestId=" + contest);
  }

  getAllUsers():Observable<Object[]>{
    return this.http.get<Object[]>(environment.apiUrl + "/users.php");
  }

}
export class Match{
  played: Boolean
  contestId: number
}

export class Country{
  countryId: number
  name: String
}