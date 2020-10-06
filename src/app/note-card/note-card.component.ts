import { Component, Input, OnInit } from '@angular/core';


interface Note {
  title: String,
  description: String,
  hashTags?: any[],
  images?: any[]
}


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
   
  @Input() note: Note

  constructor() { }

  ngOnInit(): void {   
  }

}
