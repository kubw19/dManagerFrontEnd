import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComunicationService } from '../../../../../services/comunication.service'
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetService } from '../../../../services/get.service'
import { Stadium } from '../../../../classes/Stadium';
import { PostService } from '../../../../services/post.service';
import { Contest } from '../../../../classes/Contest';

@Component({
  selector: 'app-add-contest',
  templateUrl: './add-contest.component.html',
  styleUrls: ['./add-contest.component.scss']
})
export class AddContestComponent implements OnInit {
  //@ViewChild('name', {static: false}) nameInput: ElementRef
  constructor(private comm: ComunicationService, private getService: GetService, private postService: PostService) { }
  message: string
  stadiums: Stadium[]
  incorrectData: boolean = false
  newContestForm = new FormGroup({
    name: new FormControl("", Validators.minLength(1)),
    date: new FormControl(),
    stadiumId: new FormControl(null),
    finished: new FormControl(false)
  });

  ngOnInit() {
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
    this.getService.getStadiums().subscribe(stadiums => { this.stadiums = stadiums })
  }

  processMessage(message) {
    if (message == 'cleanUp') this.cleanUp()
  }

  addContestResponse(message) {
    if (message.message == "Incorrect data") this.incorrectData = true
    else {
      this.comm.changeMessage("closePopUp");
    }
    this.comm.changeMessage("updateData");
  }

  addToDB() {
    let formObj = this.newContestForm.getRawValue();
    formObj.stadiumId = parseInt(formObj.stadiumId)
    formObj.finished = (formObj.finished === true)
    let serializedForm = JSON.stringify(formObj);
    this.postService.postJSON(serializedForm, "/contests.php").subscribe(data => {
      this.addContestResponse(data)
    }, err => {
      this.addContestResponse(err.error)
    });

  }

  cleanUp() {
    this.newContestForm.reset()
    this.incorrectData = false;
  }

}
