
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ComunicationService } from '../../../../services/comunication.service'
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GetService } from '../../../services/get.service'
import { Stadium } from '../../../classes/Stadium';
import { PostService } from '../../../services/post.service';
import { Contest } from '../../../classes/Contest';


@Component({
  selector: 'app-add-contest-player',
  templateUrl: './add-contest-player.component.html',
  styleUrls: ['./add-contest-player.component.scss']
})


export class AddContestPlayerComponent implements OnInit {

  @ViewChild('add', { static: false }) addBox: ElementRef
  @Input() contestId: number
  constructor(private comm: ComunicationService, private getService: GetService, private postService: PostService) { }
  message: string
  users: Object[]
  incorrectData: boolean = false
  newPlayerForm = new FormGroup({
    userId: new FormControl(""),
  });

  ngOnInit() {
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
    this.getService.getAllUsers().subscribe(users => { this.users = users })
  }

  processMessage(message) {
    if (message == 'cleanUp') this.cleanUp()
  }

  addResponse(message) {
    if (message.message == "Incorrect data") this.incorrectData = true
    else {
      this.comm.changeMessage("closePopUp");
      this.comm.changeMessage("updateData");
    }
  }

  addToDB() {
    let formObj = this.newPlayerForm.getRawValue();
    formObj.contestId = this.contestId
    let serializedForm = JSON.stringify(formObj);
    this.postService.postJSON(serializedForm, "/humanPlayers.php").subscribe(data => this.addResponse(data), err => { this.addResponse(err.error) });

  }

  cleanUp() {
    this.newPlayerForm.reset()
    this.incorrectData = false;
  }

}
