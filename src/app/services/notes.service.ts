import { Injectable } from '@angular/core';

interface Note {
  uid: String,
  title: String,
  description: String,
  created?: String,
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
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      title: 'New Test',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
  ]

}
