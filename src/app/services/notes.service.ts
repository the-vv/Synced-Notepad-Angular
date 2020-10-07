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
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '2',
      title: 'New Test2',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '3',
      title: 'New Test3',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '4',
      title: 'New Test4',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '5',
      title: 'New Test5',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '6',
      title: 'New Test6',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '7',
      title: 'New Test7',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '8',
      title: 'New Test8',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '9',
      title: 'New Test9',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
  ]

}
