import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  constructor(
    private afDataBase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private storage: Storage) {
  }

  async saveSesion(user: any) {
    try {
      await this.register(user);
      const userDataBase = await this.getUser(user.uid);
      await this.storage.ready();
      await this.storage.remove("user");
      await this.storage.set("user", userDataBase);
    } catch (error) {
      throw error;
    }
  }


  register(user: any) {
    return this.afDataBase.object(`users/${user.uid}`).update(user);
  }

  getUser(uid: string) {
    return this.afDataBase.object(`users/${uid}`).valueChanges().take(1).toPromise()
  }

  signOut() {
    return this.afAuth.auth.signOut()
  }

  getSesion() {
    return this.afAuth.auth.currentUser;
  }

}
