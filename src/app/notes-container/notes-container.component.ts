import { Component, HostListener, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service'
import Note from '../Interfaces/Note'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isDrawerOpen = event.target.innerWidth >= 768
  }

  Notes: Note[]
  isDrawerOpen: boolean = true;
  uid: string
  searchQuery: string

  constructor(
    private snackbar: MatSnackBar,
    public router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    public Note: NotesService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQuery = params['id'];
      if (this.searchQuery) {
        if (this.searchQuery.substr(0, 5) == 'hash-') {
          this.searchQuery = '#' + this.searchQuery.substr(5)
        }
        console.log(this.searchQuery);
        this.openSnackBar('Showing results for ' + this.searchQuery)
        this.searchResults = this.Note.searchNotes(this.searchQuery)
      }
    })
    this.isDrawerOpen = window.innerWidth >= 768
  }

  searchResults: Note[]
  searchExpand = false
  searchValue: string = ''
  searchChange(q?: string) {
    let query = q ? q : this.searchValue
    if (query && query.length) {
      if (query[0] == '#') {
        query = 'hash-' + query.substr(1)
      }
      this.router.navigate(['notes/search/' + query])
    }
    this.searchValue = ''
  }

  byDate = true
  sortNotes(method: string) {
    if (method == 'date') {
      this.byDate = true
      this.Note.userNotes = this.Note.userNotes.sort((a, b) => {
        return b.timestamp - a.timestamp
      })
    } else if (method == 'a-z') {
      this.byDate = false
      this.Note.userNotes = this.Note.userNotes.sort((a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
      })
    }
    this.openSnackBar('Sorted by ' + method)
  }
  
  openSnackBar(message: string, dur: number = 3000, action: string = 'Dismiss') {
    this.snackbar.open(message, action, {
      duration: dur,
    });
  }

}
