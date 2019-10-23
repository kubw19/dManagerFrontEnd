import { Component, OnInit } from '@angular/core';
import {version} from '../../../../version'
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public versionNumber: string
  public apiVersionNumber: string
  currentYear: string = new Date().getFullYear().toString()
  constructor(private getService: GetService) { }
  ngOnInit() {
    this.versionNumber = version.number
    this.getService.getPublicInformations().subscribe(data => {this.apiVersionNumber = data.version;})
  }

}
