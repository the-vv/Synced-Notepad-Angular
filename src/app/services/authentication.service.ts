import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotesService } from './notes.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  user$: Observable<any>;
  redirectUrl: string;
  isLoggedIn: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private notes: NotesService,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          this.isLoggedIn = true;
          this.notes.getNotes(user.uid)
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          this.isLoggedIn = false
          return of(null);
        }
      })
    )
  }
  
  openSnackBar(message: string, action: string = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  addUserToDB({ user }) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return new Promise<boolean>(async (resolve, reject) => {
      await userRef.set(data, { merge: true })
      resolve(true)
    })
  }

  FacebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    // const credential = await this.auth.signInWithPopup(provider); 
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithPopup(provider)
        .then(async (credential) => {
          // await this.addUserToDB(credential);
          this.addUserToDB(credential)
            .then((res) => {
              if (res) {
                resolve(this.redirectUrl)
              }
              else {
                reject('Write to db: false ')
              }
            })
            .catch((err) => {
              console.log('error writing user to db');
              reject(err)
            })
        })
        .catch(async (err) => {
          console.log('error signing in with facebook');
          if (err.code == 'auth/account-exists-with-different-credential') {
            this.openSnackBar('Signing in with exising google provider')
            let methods = await this.auth.fetchSignInMethodsForEmail(err.email);
            const provider = new auth.GoogleAuthProvider();
            provider.setCustomParameters({ 'login_hint': err.email });
            this.auth.signInWithPopup(provider)
              .then(async (credential) => {
                // await this.addUserToDB(credential);
                this.addUserToDB(credential)
                  .then((res) => {
                    if (res) {
                      resolve(this.redirectUrl)
                    }
                    else {
                      reject('Write to db: false ')
                    }
                  })
                  .catch((err) => {
                    console.log('error writing user to db');
                    reject(err)
                  })
              })
              .catch((err) => {
                console.log(err);
                reject(err)
              })
          }
        })
    })
  }

  async GoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    // const credential = await this.auth.signInWithPopup(provider); 
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithPopup(provider)
        .then(async (credential) => {
          // await this.addUserToDB(credential);
          this.addUserToDB(credential)
            .then((res) => {
              if (res) {
                resolve(this.redirectUrl)
              }
              else {
                reject('Write to db: false ')
              }
            })
            .catch((err) => {
              console.log('error writing user to db');
              reject(err)
            })
        })
        .catch((err) => {
          console.log('error signing in with google');
          reject(err)
        })
    })
  }

  async SignOut() {
    this.isLoggedIn = false
    console.log("signing out");
    await this.auth.signOut()
    this.notes.userNotes = undefined
    this.router.navigate(['/'])
  }
}