import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Player } from '../../../classes/Player';
import { GetService } from '../../../services/get.service';
import { PutService } from '../../../services/put.service';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

  constructor(private getService: GetService, private postService: PostService, private putService: PutService) { }

  @Output() updateRecords = new EventEmitter<number>();

  @Input() default: number
  @Input() items: Object[]
  @Input() placeholder: string
  @ViewChild('input', { static: false }) input: ElementRef;
  itemsTrimed: Object[] = [];
  notInDB: Boolean
  searchText: string = ""
  expresion: RegExp
  itemName: string
  selectedBool: boolean = false;
  selectedItem: number;
  hints: boolean = false;
  disabled: boolean = true

  click() {
    this.disabled = false;
    this.searchText = ""
    this.itemsTrimed = this.items
    this.showHints()
    this.input.nativeElement.focus()
  }

  blur() {
    this.selectedId(this.selectedItem)
    this.hideHints()
    this.input.nativeElement.set
    this.disabled = true
  }
  showHints(): void {
    this.hints = true;
  }


  hideHints(): void {
    this.hints = false;
  }

  newTrim() {
    //on key up
    this.expresion = new RegExp(this.searchText, "i")
    this.selectedBool = false
    this.itemsTrimed = [];
    for (var i = 0; i < this.items.length; i++) {
      this.itemName = this.items[i][1]
      if (this.itemName.search(this.expresion) != -1) {
        this.itemsTrimed.push(this.items[i])
      }
    }
    if (this.itemsTrimed.length == 0) this.notInDB = true;
    else this.notInDB = false;
  }

  ngOnInit() {
  }

  a = 1
  ngOnChanges(changes: SimpleChanges) {
    if (this.a > 1) {
      this.newTrim()
      this.selectedId(this.default)
    }
    this.a++
  }

  selectedId(id) {
    this.selectedItem = id;
    this.searchText = this.items.find(player => player[0] == id)[1]
    this.selectedBool = true;
  }


  change(id) {
    if (this.selectedItem == id) return
    this.updateRecords.emit(id)
  }

}
