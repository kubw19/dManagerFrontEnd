import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { GetService, Match } from '../../services/get.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import { DeleteService } from '../../services/delete.service';
import { PutService } from '../../services/put.service';
import { ComunicationService } from '../../../services/comunication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  matchId: number
  match: Match
  apiUrl: String
  played: boolean
  constructor(private location: Location, private router: Router, private getService: GetService, private deleteService: DeleteService, private route: ActivatedRoute, private putService: PutService, private comm: ComunicationService) { }

  goBack() {
    if (window.history.length > 1) {
      this.location.back()
    } else {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.matchId = params.id)
    this.update()
    this.apiUrl = environment.apiUrl

  }

  update(): void {
    this.getService.getMatch(this.matchId).subscribe(data => { 
      this.match = data[0]; 
      this.played = !!+this.match.played
      this.comm.changeMessage("updateData");
     })
  }

  deleteStatistic(id: number): void {
    if (confirm("Are you sure to delete?")) {
      this.deleteService.delete(id, "/matches.php", [{ name: 'statistics', value: 'true' }]).subscribe(() => this.update());
    }
  }

  changePlayed(): void {
    this.putService.changePlayed(this.played, this.matchId).subscribe(() => this.update());
  }

  deleteMatch(): void {
    if (confirm("Are you sure to delete this match?")) {
      this.deleteService.delete(this.matchId, "/matches.php").subscribe(() => {
        this.router.navigate(['/contest/' + this.match.contestId])
      });
    }
  }
}

