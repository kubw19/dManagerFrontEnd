import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ComunicationService } from '../../../../services/comunication.service'
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetService } from '../../../services/get.service'
import { Stadium } from '../../../classes/Stadium';
import { PostService } from '../../../services/post.service';
import { Contest } from '../../../classes/Contest';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  //@ViewChild('name', {static: false}) nameInput: ElementRef
  @Input() phaseId: number
  constructor(private comm: ComunicationService, private getService: GetService, private postService: PostService) { }
  message: string
  incorrectData: boolean = false
  newGroupForm = new FormGroup({
    name: new FormControl("")
  });

  ngOnInit() {
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
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
    let formObj = this.newGroupForm.getRawValue();
    formObj.phaseId = parseInt(this.phaseId.toString())
    let serializedForm = JSON.stringify(formObj);
    this.postService.postJSON(serializedForm, "/groups.php").subscribe(data => this.addContestResponse(data), err => { });

  }

  cleanUp() {
    this.newGroupForm.reset()
    this.incorrectData = false;
  }

}
