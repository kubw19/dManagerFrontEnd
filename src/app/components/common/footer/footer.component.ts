import { Component, OnInit } from '@angular/core';
import {version} from '../../../../version'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public versionNumber: string
  currentYear: string = new Date().getFullYear().toString()
  constructor() { }
  ngOnInit() {
    this.versionNumber = version.number
  }

}
