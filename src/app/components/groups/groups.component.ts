import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ComunicationService } from '../../../services/comunication.service';
import { GetService } from '../../services/get.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @ViewChild('add', {static: false}) addButton
  @Input() phaseId: number
  @Input() groupPhase: boolean
  groups: Object[]
  constructor(private comm: ComunicationService, private getService: GetService) { }

  processMessage(message: string): void{
    if(message=="updateData"){
      this.update();
    }
  }

  ngOnInit() {
    this.update();
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
  }

  update(){
    this.getService.getGroups(this.phaseId).subscribe(data => {this.groups = data; console.log(data)})
  }

  public add(){
    this.addButton.toggle()
  }


}
