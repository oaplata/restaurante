import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    private afAuth: AngularFireAuth,
    private authProvider: AuthProvider,
    private navCtrl: NavController) {
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  ionViewDidLoad() {
    this.afAuth.auth.onAuthStateChanged(async state => {
      if (state) {
        const user = {
          uid: state.uid,
          name: state.displayName,
          email: state.email,
          lastSesion: Date.now(),
          photo: state.photoURL
        };
        await this.authProvider.saveSesion(user).catch(error => console.error(error));
        this.navCtrl.setRoot(TabsPage);
      }
    })
  }

}
