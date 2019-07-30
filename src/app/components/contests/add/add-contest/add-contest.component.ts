import { Component, OnInit, ViewChild } from '@angular/core';
import { ComunicationService} from '../../../../../services/comunication.service'
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-contest',
  templateUrl: './add-contest.component.html',
  styleUrls: ['./add-contest.component.scss']
})
export class AddContestComponent implements OnInit{
  @ViewChild('addForm', {static: false}) addForm: NgForm
  constructor(private comm: ComunicationService) { }
  message: string
  ngOnInit() {
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
  }

  processMessage(message){
    if(message=='cleanUp')this.cleanUp()
  }

  cleanUp(){
    //TODO tutaj czyszczenie formularza
  }

}
