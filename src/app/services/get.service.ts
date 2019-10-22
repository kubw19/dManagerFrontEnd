import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Contest } from '../classes/Contest'
import {Stadium} from '../classes/Stadium'
import {environment} from '../../environments/environment'
import { Player } from '../classes/Player';
import { User } from '../classes/User';

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

  getUser(userId: number):Observable<User>{
    return this.http.get<User>(environment.apiUrl + "/users.php?userId=" + userId);
  }

}
export class Match{
  played: Boolean
  contestId: number
  contest
  phase
  group
  c1image
  c1
  p1name
  p1surname
  c1id
  injuriest1
  yellowst1
  redst1
  c2image
  c2
  p2name
  p2surname
  c2id
  injuriest2
  yellowst2
  redst2
  goalst1
  goalst2
}

export class Country{
  countryId: number
  name: String
}