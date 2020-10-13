import { Component, Input, OnInit } from '@angular/core';
import Note from '../Interfaces/Note'
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatDialog} from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { NotesService } from '../services/notes.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
   
  @Input() note: Note

  constructor(
    private _snackBar: MatSnackBar,
    public Notes: NotesService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {   
  }

  DeleteNote(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: this.note.title
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show()
        this.Notes.deleteNote(this.note)
          .then((res) => {
            this.spinner.hide()
            console.log(res)
            this.openSnackBar('Note deleted')
          })
          .catch((res) => {
            if (res.note) {
              this.spinner.hide()
            }
          })
      }
    });
  }
  
  openSnackBar(message: string, action: string = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
