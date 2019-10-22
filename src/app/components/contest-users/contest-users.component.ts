import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DeleteService } from '../../services/delete.service';
import { ComunicationService } from '../../../services/comunication.service';

@Component({
  selector: 'app-contest-users',
  templateUrl: './contest-users.component.html',
  styleUrls: ['./contest-users.component.scss']
})
export class ContestUsersComponent implements OnInit {

  @Input() users
  @Input() contestId

  constructor(private deleteService: DeleteService, private comm: ComunicationService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) { }
  delete(userId: number): void {
    if (confirm("Are you sure to deprive this user of crew membership?")) {
      this.deleteService.delete(userId, "/contestsUsers.php").subscribe(data => this.comm.changeMessage("updateData"), err => {
        alert("At least one owner of contest is required!")
      });
    }
  }
}
