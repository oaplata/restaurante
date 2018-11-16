import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthProvider {

  constructor(private afDataBase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private storage: Storage) { }

  async saveSesion(user: any) {
    try {
      await this.register(user);
      const userDataBase = await this.getUser(user.uid);
      await this.storage.ready();
      await this.storage.set("user", userDataBase);
    } catch (error) {
      throw error;
    }
  }


  register(user: any) {
    return this.afDataBase.object(`users/${user.uid}`).update(user);
  }

  getUser(uid: string) {
    return this.afDataBase.object(`users/${uid}`).valueChanges().first().toPromise();
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  getSesion() {
    return this.storage.get("user");
  }

}
