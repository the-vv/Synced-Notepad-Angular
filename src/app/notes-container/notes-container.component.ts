import { Component, HostListener, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { AuthenticationService } from '../services/authentication.service'
import Note from '../Interfaces/Note'

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

  constructor(
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
            }
            else {
              this.Note.userNotes = [];
              this.Notes = []
            }
          })  
      }else{
        this.Note.userNotes = []
      }
    })
    setTimeout(() => {
      this.isDrawerOpen = window.innerWidth >= 768
    }, 1500);
  }

  searchResults:Note[]
  searchExpand = false
  searchValue: string = ''
  searchChange(q?: string) {
    let query = q ? q : this.searchValue
    if(query && query.length){
      console.log('searched',q ? q : this.searchValue);
      this.searchResults = this.Note.searchNotes(q ? q : this.searchValue)
      console.log(this.searchResults);      
    }
    this.searchValue = ''
  }

}
