import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ComunicationService} from '../../../../services/comunication.service'
import {NgForm, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { GetService } from '../../../services/get.service'
import { Stadium } from '../../../classes/Stadium';
import { PostService } from '../../../services/post.service';
import { Contest } from '../../../classes/Contest';

@Component({
  selector: 'app-add-phase',
  templateUrl: './add-phase.component.html',
  styleUrls: ['./add-phase.component.scss']
})

export class AddPhaseComponent implements OnInit{
  @ViewChild('add', {static: false}) addBox: ElementRef
  @Input() contestId: number
  constructor(private comm: ComunicationService, private getService: GetService, private postService: PostService) { }
  message: string
  stadiums: Stadium[]
  incorrectData: boolean = false
  newPhaseForm = new FormGroup({
    name: new FormControl("", Validators.minLength(1)),
    contestId: new FormControl(""),
    groupPhase: new FormControl()
  });

  ngOnInit() {
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
    this.getService.getStadiums().subscribe(stadiums => {this.stadiums = stadiums})
  }

  processMessage(message){
    if(message=='cleanUp')this.cleanUp()
  }

  addContestResponse(message){
    if(message.message=="Incorrect data")this.incorrectData = true
    else{
      this.comm.changeMessage("closePopUp");
    }
    this.comm.changeMessage("updateData");
  }

  addToDB(){
    let formObj = this.newPhaseForm.getRawValue();
    formObj.groupPhase = (formObj.groupPhase === true)
    formObj.contestId = parseInt(this.contestId.toString())
    let serializedForm = JSON.stringify(formObj);
    this.postService.postJSON(serializedForm, "/phases.php").subscribe(data => this.addContestResponse(data), err => {this.addContestResponse(err.error)});

  }

  cleanUp(){
    this.newPhaseForm.reset()
    this.incorrectData = false;
  }

}
