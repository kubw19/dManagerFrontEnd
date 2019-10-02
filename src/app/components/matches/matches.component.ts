import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GetService } from '../../services/get.service';
import { environment } from '../../../environments/environment'
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComunicationService } from '../../../services/comunication.service';
import { DeleteService } from '../../services/delete.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  @ViewChild('add', { static: false }) addButton
  @Input() groupId: number
  group: Object;
  phase: Object
  apiUrl: String
  matches: Object[]
  separate: Boolean
  message: string
  contestId: number

  constructor(private location: Location, private getService: GetService, private route: ActivatedRoute, private router: Router, private comm: ComunicationService, private deleteService: DeleteService) {
    route.params.subscribe(val => {
      //this.update();
    });
  }


  goBack() {
    if (window.history.length > 1) {
      this.location.back()
    } else {
      this.router.navigate(['/home'])
    }
  }

  ngOnInit() {
    if (!this.groupId) {
      this.route.params.subscribe(params => this.groupId = params.id)
      this.separate = true
    }
    this.apiUrl = environment.apiUrl
    this.update();
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
  }

  update(): void {
    this.getService.getMatchesByGroup(this.groupId).subscribe(data => {
      Array.isArray(data) ? this.matches = data : this.matches = [];
    })
    this.getService.getGroup(this.groupId).subscribe(data => { this.group = data; this.getPhase() 
   console.log(data)
  })
  }

  getPhase() {
    if (this.group[0]) this.getService.getPhase(this.group[0].phaseId).subscribe(data => {this.phase = data;this.contestId = data[0].contestId})

  }

  public add() {
    this.addButton.toggle();
  }

  processMessage(message: string): void {
    if (message == "updateData") {
      this.update();
    }
  }

  delete() {
    if (confirm("Are you sure to delete this group?")) {
      this.deleteService.delete(this.groupId, "/groups.php").subscribe(() => {
        this.router.navigate(['/contest/' + this.phase[0].contestId])
      })
    }
  }

}
