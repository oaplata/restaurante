import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Order } from '../../interfaces/order';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {

  constructor(private angulaFiireDataBase: AngularFireDatabase) { }

  async saveOrder(order: Order): Promise<boolean> {
    try {
      await this.angulaFiireDataBase.object(`orders/${order.id}`).set(order);
      const creadted = await this.angulaFiireDataBase.object(`orders/${order.id}`).valueChanges().take(1).toPromise()
      return creadted ? true : false;
    } catch (error) {
      throw error;
    }
  }

}
