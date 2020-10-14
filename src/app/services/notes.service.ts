import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Note from '../Interfaces/Note'
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Quote } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  status: Observable<string>
  userNotes: Note[]
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  searchNotes(query: string) {
    let filteredNotes = []
    let notes = this.userNotes.filter((el) => {
      for (let tag of el.hashTags) {
        if (String(tag).toLocaleLowerCase() === query.toLocaleLowerCase()) {
          return true
        }
        if (query[0] != '#') {
          if (String(tag).toLocaleLowerCase() === '#' + query.toLocaleLowerCase()) {
            return true
          }
        }
      }
      return false
    })
    // filteredNotes.concat(notes)
    console.log(notes);
    if (query[0] != '#') {
      let qnotes = this.userNotes.filter((el) => {
        let title = el.title.split(' ')
        let titlesm = title.map((el) =>{
          return el.toLocaleLowerCase()
        })
        let desc = el.description.split(' ')
        let descs = desc.map((el) =>{
          return el.toLocaleLowerCase()
        })
        if (titlesm.includes(query.toLocaleLowerCase()) || descs.includes(query)) {
          notes.push(el)
          return true
        }
      })
      console.log(qnotes);
    }
    console.log([...new Set(notes)]);    
  }

  openSnackBar(message: string, dur: number = 3000, action: string = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: dur,
    });
  }

  addNote(note: Note) {
    const notesRef: any = this.afs.collection('notes');
    return new Promise<boolean>(async (resolve, reject) => {
      await notesRef.add(note)
      this.openSnackBar('Note added', 3000)
      resolve(true)
    })
  }

  updateNote(note: Note, id: string) {
    console.log(note);
    const notesRef: any = this.afs.collection('notes').doc(id);
    return new Promise<boolean>(async (resolve, reject) => {
      await notesRef.set(note, { merge: true })
      this.openSnackBar('Note edited', 3000)
      resolve(true)
    })
  }

  upload(file) {
    const path = `NoteImages/${Date.now()}_${file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, file);
    // Progress monitoring
    this.status = this.task.snapshotChanges().pipe(map(s => s.state));
    this.percentage = this.task.percentageChanges();
    return new Promise((resolve, reject) => {
      this.task.then(async (res) => {
        let url = await res.ref.getDownloadURL()
        resolve(url);
      })
        .catch((err) => {
          if (err.code_ == 'storage/unauthorized') {
            this.openSnackBar('Permission denied: Max. file size is 5MB', 3000)
            console.log(err.message_);
            reject(err.code_)
          }
        })
    })
  }

  cancelUpload() {
    this.status.subscribe((s) => {
      if (s && s != 'success') {
        let r = this.task.cancel()
        if (r) {
          console.log('Cancelled');
          this.openSnackBar('Uploading cancelled')
        } else {
          console.log('Error cancelling');
          this.openSnackBar('Error cancelling upload')
        }
      }
    })
  }

  delete(url) { //delete image
    return this.storage.storage.refFromURL(url).delete()
  }

  deleteNote(note: Note) {
    let image = note.images
    return new Promise<any>((resolve, reject) => {
      this.afs.collection("notes").doc(String(note.id)).delete()
        .then(() => {
          if (image) {
            this.delete(image).then((res) => {
              resolve({ note: true, image: true });
            })
              .catch((res) => {
                reject({ note: true, image: false })
              })
          } else {
            resolve({ note: true })
          }
        })
        .catch((res) => {
          reject({ note: false, image: false })
        })
    })
  }

  getNotes(uid: string) { //return all the notes
    return this.afs.collection("notes", ref => ref.where('uid', '==', uid)).snapshotChanges()
  }

  getHashTags() { //return all the #Tags
    let hashes = []
    for (let note of this.userNotes) {
      for (let tag of note.hashTags) {
        hashes.push(tag)
      }
    }
    hashes = [...new Set(hashes)]
    if (hashes.length) {
      return hashes
    }
    else {
      return []
    }
  }

  getNote(id) { //return a single note matched from note id
    return this.userNotes.filter((note) => {
      return note.id == id
    })[0]
  }

}
