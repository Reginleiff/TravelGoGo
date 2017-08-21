import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './../objects';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  userObs: Observable<firebase.User>;
  user: firebase.User;

  userName: string;
  uid: string;
  userRef: string;
  isLoggedIn: boolean;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.userObs = afAuth.authState;
    this.afAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        this.isLoggedIn = true;
        this.user = afAuth.auth.currentUser;
        this.uid = afAuth.auth.currentUser.uid;
        this.userName = afAuth.auth.currentUser.displayName;
      } else {
        this.isLoggedIn = false;
        this.user = null
      }
    })
  }

  login(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  updAuthStatus(): void {
    this.isLoggedIn = (this.userObs !== null);
  }
  
  getUID(): string {
    return this.user.uid;
  }

  getUserName(): string {
    return this.user.displayName;
  }
}
