import { Injectable } from '@angular/core';

interface Note {
  title: String,
  description: String,
  hashTags?: any[],
  images?: any[]
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() {
  }

  getNotes() {
    return this.userNotes;
  }
  getHashTags() {
    let hashes = []
    for(let note of this.userNotes){
      for(let tag of note.hashTags){
          hashes.push(tag)    
      }
    }
    hashes = [...new Set(hashes)]
    return hashes
  }

  userNotes: Note[] = [
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test2']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test1']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
    {
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['new', 'temp', 'test']
    },
  ]

}
