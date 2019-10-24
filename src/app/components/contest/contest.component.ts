import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/get.service';
import { PutService } from '../../services/put.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contest } from '../../classes/Contest';
import { ComunicationService } from '../../../services/comunication.service';
import { DeleteService } from '../../services/delete.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss']
})
export class ContestComponent implements OnInit {

  constructor(private putService: PutService, private getService: GetService, private route: ActivatedRoute, private comm: ComunicationService, private deleteService: DeleteService, private router: Router) { }

  processMessage(message: string): void {
    if (message == "updateData") {
      this.update();
    }
  }

  public played: boolean
  contestId: number
  contest: Contest = new Contest();
  ngOnInit() {
    this.route.params.subscribe(params => this.contestId = params.id)
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
    this.update()
  }

  update() {
    this.getService.getContest(this.contestId).subscribe(data => {this.contest = data[0]; this.played=this.contest.finished})
  }

  deleteContest(): void {
    if (confirm("Are you sure to delete this contest?")) {
      if (confirm("DELETE this contest?")) {
        this.deleteService.delete(this.contestId, "/contests.php").subscribe(() => {
          this.router.navigate(['/'])
        })
      }
    }
  }

  changeFinished(){
    this.putService.changeFinished(this.played, this.contestId).subscribe()
  }
}
