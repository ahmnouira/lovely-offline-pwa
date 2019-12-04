import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './notes-card.component.html',
  styleUrls: ['./notes-card.component.scss']
})
export class NotesCardComponent implements OnInit {
  @Input() note;

  @Input() loading;
  
  @Input() edit : boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
