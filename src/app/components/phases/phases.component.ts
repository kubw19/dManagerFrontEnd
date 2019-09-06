import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ComunicationService } from '../../../services/comunication.service';
import { GetService } from '../../services/get.service';
import { DeleteService } from '../../services/delete.service';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.scss']
})
export class PhasesComponent implements OnInit {
  @Input() contestId: number  
  phases: Object[]
  constructor(private comm: ComunicationService, private getService: GetService, private deleteService: DeleteService) { }

  processMessage(message: string): void{
    if(message=="updateData"){
      this.update();
    }
  }

  ngOnInit() {
    this.update()
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
  }

  update(){
    this.getService.getPhases(this.contestId).subscribe(data => this.phases = data)
  }

  delete(id:number, name: string){
    if(confirm("Are you sure to delete phase " + name + "?")){
      this.deleteService.delete(id, "/phases.php").subscribe(data => this.update())
    }
  }
}