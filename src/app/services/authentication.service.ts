import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  user$: Observable<any>;

  constructor(
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router  
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
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
    userRef.set(data, { merge: true })
  }

  FacebookLogin() {
    return new Promise<any>((resolve, reject) => { }) //not working so deprecated
  }

  async GoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider);
    this.addUserToDB(credential);
    this.router.navigate(['/'])
  }

  IsLoggedIn() {
    return new Promise<any>((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          var User = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            uid: user.uid,
            providerData: user.providerData
          }
          resolve(User);
        }
        else {
          reject(null)
        }
      })
    })
  }

  SignOut() {
    console.log("signing out");    
    return new Promise<any>((resolve, reject) => {
      this.auth.signOut().then(() => {
        resolve(true)
      })
        .catch((error) => {
          reject(false);
        })
    })
  }
}