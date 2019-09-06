import { Component, OnInit, Input } from '@angular/core';
import { GetService } from '../../services/get.service';
import { ComunicationService } from '../../../services/comunication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-matches',
  templateUrl: './group-matches.component.html',
  styleUrls: ['./group-matches.component.scss']
})
export class GroupMatchesComponent implements OnInit {
  groupId: number;
  matches: Object[]
  constructor(private getService: GetService, private comm: ComunicationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.groupId = params.id)
    this.update()
  }

  update(){
    this.getService.getMatchesByGroup(this.groupId).subscribe(data => {this.matches = data; console.log(data)})
  }
}
