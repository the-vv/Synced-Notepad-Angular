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
  redirectUrl: string;
  isLoggedIn: boolean = false;

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
          this.isLoggedIn = true;
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          this.isLoggedIn = false
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
    return new Promise<boolean>(async (resolve, reject) => {
      await userRef.set(data, { merge: true })
      resolve(true)
    })
  }

  FacebookLogin() {
    return new Promise<any>((resolve, reject) => { }) //not working so deprecated
  }

  async GoogleLogin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider);
    await this.addUserToDB(credential);
    console.log(this.redirectUrl);
    this.router.navigate([this.redirectUrl ? this.redirectUrl : '/'])
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      })
  }

  async SignOut() {
    this.isLoggedIn = false
    console.log("signing out");
    await this.auth.signOut()
    this.router.navigate(['/'])
  }
}