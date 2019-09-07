import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetService } from '../../../services/get.service';
import { PostService } from '../../../services/post.service';
import { Player } from '../../../classes/Player'
import { PutService } from 'src/app/services/put.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})
export class PlayerSearchComponent implements OnInit {

  constructor(private getService: GetService, private postService: PostService, private putService: PutService) { }

  @Input() countryId: number;
  @Input() type: string;
  @Input() matchId: number;

  @Output() updateRecords = new EventEmitter<void>();

  players: Player[];
  playersTrimed: Player[] = [];
  notInDB: Boolean
  searchText: string;
  expresion: RegExp
  playerName: string
  selectedPlayerBool: boolean = false;
  selectedPlayer: number;
  hints: boolean = false;


  showHints(): void {
    this.hints = true;
  }


  hideHints(): void {
    this.hints = false;
  }

  newTrim() {
    //on key up
    this.expresion = new RegExp(this.searchText, "i")
    this.selectedPlayerBool = false
    this.playersTrimed = [];
    for (var i = 0; i < this.players.length; i++) {
      this.playerName = this.players[i]["name"] + " " + this.players[i]["surname"];
      if (this.playerName.search(this.expresion) != -1) {
        this.playersTrimed.push(this.players[i])
      }
    }
    if (this.playersTrimed.length == 0) this.notInDB = true;
    else this.notInDB = false;
  }

  ngOnInit() {
    this.getService.getPlayersByCountry(this.countryId).subscribe(
      data => this.players = data, () => this.newTrim())
  }

  selectedPlayerId(id) {
    this.selectedPlayer = id;
    this.searchText = this.players.find(player => player.playerId == id).name + " " + this.players.find(player => player.playerId == id).surname
    this.selectedPlayerBool = true;
  }

  Add() {
    if (this.selectedPlayerBool == true) {
      this.putService.addStatistic(this.type, this.selectedPlayer, this.matchId).subscribe(data => this.updateRecords.emit());
      this.selectedPlayerBool = false;
      this.searchText = "";
    }
  }

}