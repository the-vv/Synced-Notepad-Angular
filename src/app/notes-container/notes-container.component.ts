import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

interface Note {
  title: String,
  description: String,
  hashTags?: any[],
  images?: any[]
}

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  Notes: Note[]

  constructor(public Note: NotesService) {
   }

  ngOnInit(): void {
    this.Notes = this.Note.getNotes()
    console.log(this.Notes);
    
  }

}
