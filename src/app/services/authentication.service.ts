import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs'
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    public auth: AngularFireAuth,
  ) { }

  FacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.FacebookAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.auth.signInWithPopup(provider).then(res => {
        resolve(res);
      },
      (error) =>{
        reject(error)       
      }),
        error => {
          reject(error)
        }
    })
  }

  GoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.auth.signInWithPopup(provider).then(res => {
        resolve(res);
      },
      (error) =>{
        reject(error)       
      }),
        error => {
          reject(error)
        }
    })
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
        else{
          reject(null)       
        }
      })
    })
  }

  
  SignOut() {
    return new Promise<any>((resolve, reject) => {
      this.auth.signOut().then(() => {
        resolve(true)
      })
      .catch((error) => {
          reject(false);
        })
      })
    }

  // SignOut() {
  //   return new Promise<any>((resolve, reject) => {
  //     this.auth.signOut().then(function () {
  //       resolve(false)
  //     },
  //       (error) => {
  //         reject(false)
  //       }).catch(function (error) {
  //         console.log('error');
  //       })
  //     })
  //   }
}