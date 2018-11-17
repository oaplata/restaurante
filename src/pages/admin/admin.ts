import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../interfaces/order';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  public page = 'users';
  public users = [];
  public total: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private usersProvider: UserProvider, private orderProvider: OrderProvider) {
  }

  async changeRol(user) {
    await this.usersProvider.changeRolUser(user.uid, user.role);
  }

  ionViewDidLoad() {
    this.usersProvider.getUsers().valueChanges().subscribe((users) => {
      this.users = users;
    });

    this.orderProvider.getOrders().valueChanges().subscribe((orders: Order[]) => {
      const fehcha = new Date();
      fehcha.setHours(0, 0, 0, 0);
      let total = 0;
      orders.forEach(o => {
        if (o.state === 'closed') {
          let fechaOrder = new Date();
          fechaOrder.setTime(parseInt(o.id));
          fechaOrder.setHours(0, 0, 0, 0);
          if (fehcha.getTime() === fechaOrder.getTime()) {
            total += this.getTotalOrder(o);
          }
        }
      });

      this.total = total;
    });
  }

  getTotalOrder(order: Order) {
    let total = 0;
    order.plates.forEach(p => total += p.amount * p.value);
    return total;
  }

}
