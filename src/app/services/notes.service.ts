import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import Note from '../Interfaces/Note'


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) {
  }

  addNote(note: Note) {
    return new Promise((resolve, reject) => {
      this.userNotes.push(note)
      resolve()
    })
  }

  upload(file) {
    const path = `test/${Date.now()}_${file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file);

    console.log(this.task)
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      // tap(console.log),
      // The file's download URL
      finalize( () =>  {
        console.log('await');
        
        this.downloadURL = ref.getDownloadURL();
        console.log(this.downloadURL);        
      }),
    );
  }

  getNotes() { //return all the notes
    return this.userNotes;
  }
  getHashTags() { //return all the #Tags
    let hashes = []
    for (let note of this.userNotes) {
      for (let tag of note.hashTags) {
        hashes.push(tag)
      }
    }
    hashes = [...new Set(hashes)]
    return hashes
  }

  getNote(id) { //return a single note matched from note id
    return this.userNotes.filter((note) => {
      return note.id == id
    })[0]
  }

  userNotes: Note[] = [
    {
      uid: '1',
      id: '1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      hashTags: ['#new', '#temp', '#test'],
      images: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
    },
    {
      uid: '2',
      id: '2',
      title: 'New Test2',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      id: '3',
      title: 'New Test3',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '2',
      id: '4',
      title: 'New Test4',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '3',
      id: '5',
      title: 'New Test5',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '2',
      id: '6',
      title: 'New Test6',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      id: '7',
      title: 'New Test7',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '3',
      id: '8',
      title: 'New Test8',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
    {
      uid: '1',
      id: '9',
      title: 'New Test9',
      description: 'New test escription',
      hashTags: ['#new', '#temp', '#test']
    },
  ]

}
