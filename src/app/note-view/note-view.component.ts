import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { NotesService } from '../services/notes.service'
import Note from '../Interfaces/Note'
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../confirmation/confirmation.component'

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {

  id: String
  Note: Note

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    public Notes: NotesService
  ) { }

  openSnackBar(message: string, action: string = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.Note = this.Notes.getNote(this.id)
      // console.log(this.Note)
      if (!this.Note) {
        this.router.navigate(['404'])
      }
    });
    // this.spinner.hide()
  }

  DeleteNote(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: this.Note.title
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show()
        this.Notes.deleteNote(this.Note)
          .then((res) => {
            this.spinner.hide()
            // console.log(res)
            this.openSnackBar('Note deleted')
            this.router.navigate(['/notes'], { replaceUrl: true })
          })
          .catch((res) => {
            if (res.note) {
              this.spinner.hide()
              this.router.navigate(['/notes'], { replaceUrl: true })
            }
          })
      }
    });
  }
}
