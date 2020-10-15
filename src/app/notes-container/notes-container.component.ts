import { Component, HostListener, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service'
import Note from '../Interfaces/Note'
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  hashTags: any[]
  uid: string
  loading: boolean = true;
  searchQuery: string

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    public Note: NotesService
  ) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.Note.getNotes(user.uid)
          .subscribe((data) => {
            if (data.length) {
              // console.log(data[0].payload.doc.data()); 
              let notes = []
              data.forEach(element => {
                let data = element.payload.doc.data() as Note
                let note = {
                  id: element.payload.doc.id,
                  ...data
                }
                notes.push(note)
              });
              this.Note.userNotes = notes;
              this.Notes = notes
              this.hashTags = this.Note.getHashTags()
              this.loading = false 
              this.route.params.subscribe(params => {
                this.searchQuery = params['id'];
                if (this.searchQuery) {
                  if (this.searchQuery.substr(0, 5) == 'hash-') {
                    this.searchQuery = '#' + this.searchQuery.substr(5)
                  }
                  console.log(this.searchQuery);
                  this.searchResults = this.Note.searchNotes(this.searchQuery)
                }
              })
            }
            else {
              this.hashTags = this.Note.getHashTags()
              this.Note.userNotes = [];
              this.Notes = []
            }
          })
      } else {
        this.Note.userNotes = []
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

}
