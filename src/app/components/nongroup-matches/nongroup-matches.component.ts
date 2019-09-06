import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-nongroup-matches',
  templateUrl: './nongroup-matches.component.html',
  styleUrls: ['./nongroup-matches.component.scss']
})
export class NongroupMatchesComponent implements OnInit {
  @ViewChild('add', {static: false}) addButton
  @Input() groupId: number

  matches: Object[]

  constructor(private getService: GetService) { }

  ngOnInit() {
    this.getService.getMatchesByGroup(this.groupId).subscribe(data => this.matches = data)
  }

  public add(){
    this.addButton.toggle();
  }

}
