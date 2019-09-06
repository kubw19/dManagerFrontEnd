import { Component, OnInit, Input} from '@angular/core';
import { ComunicationService} from '../../../../services/comunication.service'

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.scss']
})
export class AddBoxComponent implements OnInit {

  @Input() boxName: String
  shown: boolean = false;
  

  constructor(private comm: ComunicationService) { }

  ngOnInit(){    
    this.comm.currentMessage.subscribe(message => this.processMessage(message))
  }

  processMessage(message){
    if(message=='closePopUp'){
      this.shown = false;
      this.comm.changeMessage("cleanUp")  
    }
  }

  toggle(): void{
    this.shown = !this.shown;
    if(this.shown)this.comm.changeMessage("cleanUp")  
  }

}
