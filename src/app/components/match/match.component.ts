import { Component, OnInit, APP_INITIALIZER } from '@angular/core';
import { GetService } from '../../services/get.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment'
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  matchId: number
  match: Object
  apiUrl: String
  constructor(private getService: GetService, private deleteService: DeleteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.matchId = params.id)
    this.update()
    this.apiUrl = environment.apiUrl

  }

  update(): void {
    this.getService.getMatch(this.matchId).subscribe(data => this.match = data[0])
  }

  deleteStatistic(id: number): void {
    if (confirm("Are you sure to delete?")) {
      this.deleteService.delete(id, "/matches.php", [{ name: 'statistics', value: 'true' }]).subscribe(() => this.update());
    }
  }
}
