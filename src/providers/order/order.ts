import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Order } from '../../interfaces/order';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';
import { Plate } from '../../interfaces/plate';

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
      const creadted = await this.angulaFiireDataBase.object(`orders/${order.id}`).valueChanges().first().toPromise()
      return creadted ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(order: Order): Promise<boolean> {
    try {
      await this.angulaFiireDataBase.object(`orders/${order.id}`).update(order);
      const creadted = await this.angulaFiireDataBase.object(`orders/${order.id}`).valueChanges().first().toPromise()
      return creadted ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async cancellOrder(id: string) {
    await this.angulaFiireDataBase.object(`orders/${id}`).update({state: "cancelled"});
    return true;
  }

  async closeOrder(id: string) {
    await this.angulaFiireDataBase.object(`orders/${id}`).update({state: "closed"});
    return true;
  }
  
  getOrders(){
    return this.angulaFiireDataBase.list('orders')
  }

  async createPlate(plate: Plate) {
    await this.angulaFiireDataBase.object("menu").set(plate);
    return true;
  }

  getPlate() {
    return this.angulaFiireDataBase.object("menu").valueChanges().first().toPromise();
  }

}
