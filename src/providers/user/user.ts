import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserProvider {

  constructor(private angulaFiireDataBase: AngularFireDatabase) { }

  getUsers() {
    return this.angulaFiireDataBase.list('users');
  }

  async changeRolUser(id: string, role: string) {
    await this.angulaFiireDataBase.object(`users/${id}`).update({ role });
    return true;
  }

}
