import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NotesService } from '../services/notes.service'
import Note from '../Interfaces/Note'
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


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
      console.log(this.Note)
      if (!this.Note) {
        this.router.navigate(['404'])
      }
    });
    // this.spinner.hide()
  }

  DeleteNote(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: this.Note.title
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show()
        this.Notes.deleteNote(this.Note)
          .then((res) => {
            this.spinner.hide()
            console.log(res)
            this.openSnackBar('Note deleted')
            this.router.navigate(['/notes'])
          })
          .catch((res) => {
            if (res.note) {
              this.spinner.hide()
              this.router.navigate(['/notes'])
            }
          })
      }
    });
  }
}


//Confirmation Component
@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <h1 mat-dialog-title>Confirmation</h1>
  <div mat-dialog-content>
    <p>Are you sure want to delete note "{{data}}"?</p>
  </div>
  <div mat-dialog-actions class="mt-4">
    <button (click)="onNoClick()" class="btn btn-dark mr-2">Cancel</button>
    <button (click)="YesNoClick()" class="btn btn-danger ml-2" cdkFocusInitial>Ok</button>
  </div>
  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  YesNoClick(): void {
    this.dialogRef.close(true);
  }

}