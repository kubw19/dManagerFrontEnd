import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { GetService } from '../../services/get.service';
import { PutService } from '../../services/put.service';
import { DeleteService } from '../../services/delete.service';
import { ComunicationService } from '../../../services/comunication.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Contest } from '../../classes/Contest';

@Component({
  selector: 'app-contest-players',
  templateUrl: './contest-players.component.html',
  styleUrls: ['./contest-players.component.scss']
})
export class ContestPlayersComponent implements OnInit {

  private editLocked: boolean = true
  constructor(private getService: GetService, private putService: PutService, private comm: ComunicationService, private deleteService: DeleteService) { }

  public countries
  private message: string
  @Input() contestId: number
  @Input() contest: Contest
  humanPlayers: Object[]

  ngOnInit() {
    this.update()
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
  }

  ngOnChanges(changes: SimpleChanges) {
    this.editLocked = this.contest.matchesCount > 0
  }

  processMessage(message: string): void {
    if (message == "updateData") {
      this.update();
    }
  }


  updatePlayer(id, u) {
    this.putService.putJson("/humanPlayers.php", { "userId": u, "countryId": id, "contestId": this.contestId }).subscribe(
      () => this.comm.changeMessage("updateData"),
      error => alert("Team is already occupied"))
  }

  update() {
    this.getService.getCountriesAtContest(this.contestId).subscribe(data => this.humanPlayers = data)
    this.getService.getCountries().subscribe(data => {
      this.countries = data.map(function (x) {
        return [x.countryId, x.name];
      });
    });
  }

  delete(id) {
    if (confirm("Are you sure to exlude this user from this contest?")) {
      this.deleteService.delete(id, "/humanPlayers.php").subscribe(() => this.comm.changeMessage("updateData"));
    }
  }

}
