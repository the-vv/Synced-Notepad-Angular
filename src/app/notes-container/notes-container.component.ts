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
  isDrawerOpen: boolean;
  hashTags :any[]
  uid: string
  loading: boolean = true;

  constructor(
    private auth: AuthenticationService,
    public Note: NotesService
    ) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe((user) =>{
      if(user){
        this.Note.getNotes(user.uid).then((notes) =>{
          if(notes){
            this.Notes = notes
            this.hashTags = this.Note.getHashTags()
            this.loading = false
            console.log(this.Notes);
          }
        })        
      }
    })
    this.isDrawerOpen = window.innerWidth >= 768
  }

}
