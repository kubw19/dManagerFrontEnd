import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ComunicationService} from '../../../services/comunication.service'
import {NgForm, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { GetService } from '../../services/get.service'
import { Stadium } from '../../classes/Stadium';
import { PostService } from '../../services/post.service';
import { Contest } from '../../classes/Contest';


@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {
  @ViewChild('add', {static: false}) addBox: ElementRef
  @Input() groupId: number
  @Input() contestId: number
  constructor(private comm: ComunicationService, private getService: GetService, private postService: PostService) { }
  message: string
  countries: Object[]
  incorrectData: boolean = false
  newMatchForm = new FormGroup({
    team1: new FormControl(""),
    team2: new FormControl(""),
    played: new FormControl()
  });

  ngOnInit() {
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
    this.getCountries()
  }
  getCountries(){
    this.getService.getCountriesAtContest(this.contestId).subscribe(countries => {this.countries = countries})
  }
  processMessage(message){
    if(message=='cleanUp')this.cleanUp()
    if(message=='updateData')this.getCountries()
  }

  addResponse(message){
    if(message.message=="Incorrect data")this.incorrectData = true
    else{
      this.comm.changeMessage("closePopUp");
      this.comm.changeMessage("updateData");
    }
  }

  addToDB(){
    let formObj = this.newMatchForm.getRawValue();
    formObj.team1 = parseInt(formObj.team1)
    formObj.team2 = parseInt(formObj.team2)
    formObj.played = (formObj.played === true)
    formObj.groupId = parseInt(this.groupId.toString())
    let serializedForm = JSON.stringify(formObj);
    this.postService.postJSON(serializedForm, "/matches.php").subscribe(data => this.addResponse(data), err => {this.addResponse(err.error)});

  }

  cleanUp(){
    this.newMatchForm.reset()
    this.incorrectData = false;
  }

}
