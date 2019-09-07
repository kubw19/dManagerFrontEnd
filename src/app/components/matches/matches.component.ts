import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GetService } from '../../services/get.service';
import { environment } from '../../../environments/environment'
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComunicationService } from 'src/services/comunication.service';
import { DeleteService } from '../../services/delete.service';

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

  constructor(private getService: GetService, private route: ActivatedRoute, private router: Router, private comm: ComunicationService, private deleteService: DeleteService) { }

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
    this.getService.getMatchesByGroup(this.groupId).subscribe(data => {if(data.length > 0)this.matches = data})
    this.getService.getGroup(this.groupId).subscribe(data => {this.group = data; this.getPhase()})
  }

  getPhase(){
    if(this.group)this.getService.getPhase(this.group[0].phaseId).subscribe(data => this.phase = data)
  }

  public add() {
    this.addButton.toggle();
  }

  processMessage(message: string): void{
    if(message=="updateData"){
      this.update();
    }
  }

  delete(){
    if(confirm("Are you sure to delete this group?")){
      this.deleteService.delete(this.groupId, "/groups.php").subscribe(data => this.update())
      this.router.navigate(['/contest/' + this.phase[0].contestId])
    }
  }

}
