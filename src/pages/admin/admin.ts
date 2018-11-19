import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../interfaces/order';
import { Plate } from '../../interfaces/plate';
import { TranslateProvider } from '../../providers/translate/translate';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {
  public page = 'users';
  public menuName: string;
  public menuVale: number;
  public file: any;
  public users = [];
  public orders = [];
  public total: number;
  constructor(private authProvider: AuthProvider , private translateProvider: TranslateProvider, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private usersProvider: UserProvider, private orderProvider: OrderProvider) {
  }

  async changeRol(user) {
    await this.usersProvider.changeRolUser(user.uid, user.role);
  }

  async ionViewDidLoad() {
    const user = await this.authProvider.getSesion().catch(err => console.log(err));
        if (!user || user.role !== 'admin') {
          this.navCtrl.setRoot(LoginPage);
        }
    const subscribe = this.usersProvider.getUsers().valueChanges().subscribe((users) => {
      this.users = users;
      subscribe.unsubscribe();
    });

    this.orderProvider.getOrders().valueChanges().subscribe((orders: Order[]) => {
      const fehcha = new Date();
      fehcha.setHours(0, 0, 0, 0);
      let total = 0;
      this.orders = [];
      orders.forEach(o => {
        if (o.state === 'closed') {
          let fechaOrder = new Date();
          fechaOrder.setTime(parseInt(o.id));
          fechaOrder.setHours(0, 0, 0, 0);
          if (fehcha.getTime() === fechaOrder.getTime()) {
            this.orders.push(o);
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

  changeFile($event) {
    this.file = $event.target.files[0];
  }

  async saveMenu() {
    const plate: Plate = {
      name: this.menuName,
      amount: 0,
      value: this.menuVale,
      description: ""
    }

    await this.orderProvider.createPlate(plate);

    this.notifyOrderCreateEvent(true);

  }

  async notifyOrderCreateEvent(result) {

    let message: string;
    if (result) {
      message = 'El menú ha sido actualizado';
    } else {
      message = 'Esta orden no pudo ser creada por favor intente de nuevo';
    }

    message = await this.translateProvider.translateText(message);
    const alert = this.alertCtrl.create({
      message,
      buttons: ['Ok']
    });

    alert.present();
  }

}
