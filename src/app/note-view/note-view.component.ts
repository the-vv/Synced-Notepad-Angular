import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotesService } from '../services/notes.service'

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {

  id: String

  constructor(
    private route: ActivatedRoute,
    private Notes: NotesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];   
      console.log(this.Notes.getNote(this.id))
    });   
  }

}
