import { Injectable } from '@angular/core';
import Note from '../Interfaces/Note'


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() {
  }

  ddNote(note: Note){
    return new Promise((resolve, reject) =>{
      this.userNotes.push(note)
      resolve()
    })
  }

  getNotes() { //return all the notes
    return this.userNotes;
  }
  getHashTags() { //return all the #Tags
    let hashes = new Set
    for (let note of this.userNotes) {
      for (let tag of note.hashTags) {
        hashes.add(tag)
      }
    }
    return hashes
  }

  getNote(id) { //return a single note matched from note id
    return this.userNotes.filter((note) => {
      return note.uid == id
    })[0]
  }

  userNotes: Note[] = [
    {
      uid: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      hashTags: ['#new', '#temp', '#test'],
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
        'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg',
        'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
        'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
      ]
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
