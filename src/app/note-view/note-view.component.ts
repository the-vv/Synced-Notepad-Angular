import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotesService } from '../services/notes.service'
import Note from '../Interfaces/Note'

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {

  id: String
  Note: Note

  constructor(
    private route: ActivatedRoute,
    private Notes: NotesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];   
      this.Note = this.Notes.getNote(this.id)
      console.log(this.Note)
    });   
  }

}
