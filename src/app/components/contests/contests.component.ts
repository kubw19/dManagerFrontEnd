import { Component, OnInit } from '@angular/core';
import { Contest } from '../../classes/Contest';
import { Observable } from 'rxjs';
import { GetService } from '../../services/get.service'
import { ComunicationService } from '../../../services/comunication.service';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {

  contests: Contest[];

  constructor(private getService: GetService, private comm: ComunicationService) { }

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
    this.getService.getContests().subscribe(contests => {this.contests = contests; console.log(contests)})
  }

  cleanUp(){
    
  }

}
