import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotesService } from '../services/notes.service'
import Note from '../Interfaces/Note'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {

  id: String
  Note: Note

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    public Notes: NotesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.Note = this.Notes.getNote(this.id)
      console.log(this.Note)
      if (!this.Note) {
        this.router.navigate(['404'])
      }
    });
  }

  removeNote() {
    this.spinner.show()
    this.Notes.deleteNote(this.Note)
      .then((res) => {
        this.spinner.hide()
        console.log(res)
        this.router.navigate(['/notes'])
      })
      .catch((res) => {
        if (res.note) {
          this.spinner.hide()
          this.router.navigate(['/notes'])
        }
      })
  }

}
