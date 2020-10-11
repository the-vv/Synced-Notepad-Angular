import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Note from '../Interfaces/Note'


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  userNotes: Note[]
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  addNote(note: Note) {
    const notesRef: any = this.afs.collection('notes');
    return new Promise<boolean>(async (resolve, reject) => {
      await notesRef.add(note, { merge: true })
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
    this.percentage = this.task.percentageChanges();
    return new Promise((resolve, reject) => {
      this.task.then(async (res) => {
        let url = await res.ref.getDownloadURL()
        resolve(url);
      })
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
    return new Promise<any[]>(async (resolve, reject) => {
      this.afs.collection("notes", ref => ref.where('uid', '==', uid)).snapshotChanges()
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
            this.userNotes = notes;
            resolve(notes)
          }
          else {
            this.userNotes = [];
            resolve([])
          }
        })
    })
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
