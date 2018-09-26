import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public email;
  public displayName;
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {
    this.afAuth.auth.getRedirectResult().then(res => console.log(res));
  }

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then(() => this.afAuth.auth.getRedirectResult())
      .then(res => console.log(res));
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
