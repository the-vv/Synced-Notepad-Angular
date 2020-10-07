import { Component, HostListener, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

interface Note {
  title: String,
  description: String,
  hashTags?: any[],
  images?: any[]
}

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
  hashTags = new Set

  constructor(public Note: NotesService) {
  }

  ngOnInit(): void {
    this.hashTags = this.Note.getHashTags()
    this.Notes = this.Note.getNotes()
    console.log(this.Notes);
    this.isDrawerOpen = window.innerWidth >= 768
  }

}
