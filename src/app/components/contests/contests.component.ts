import { Component, OnInit } from '@angular/core';
import { Contest } from 'src/app/classes/Contest';
import { Observable } from 'rxjs';
import { GetService } from '../../services/get.service'

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {

  contests: Contest[];

  constructor(private getService: GetService) { }

  ngOnInit() {
    this.update();
  }

  update(){
    this.getService.getContests().subscribe(contests => {this.contests = contests; console.log(this.contests)})
  }

}
