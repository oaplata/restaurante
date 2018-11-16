import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../interfaces/order';
import { BillComponent } from '../../components/bill/bill';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  public active: string = 'true';
  public allOrders: Order[] = [];
  public activeOrders: Order[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderProvider: OrderProvider, public storage: Storage, private alertCtrl: AlertController, private modalCtrl: ModalController) {
  }

  async editOrder(order: Order) {
    await this.storage.ready();
    await this.storage.set("order", order);
    this.navCtrl.parent.select(1);
  }

  async cancellOrder(order: Order) {
    await this.orderProvider.cancellOrder(order.id);
    this.notifyOrderCancellEvent();
  }

  async billOrder(order: Order) {
    const bill = this.modalCtrl.create(BillComponent, { order });
    bill.present();
  }

  notifyOrderCancellEvent() {
    let message: string = "Orden cancelada con exito";
    const alert = this.alertCtrl.create({
      message,
      buttons: ['Ok']
    });

    alert.present();
  }

  ionViewDidLoad() {
    this.orderProvider.getOrders().valueChanges().subscribe((orders: Order[]) => {
      this.allOrders = [];
      this.activeOrders = [];
      this.allOrders = orders;

      orders.forEach(o => {
        if (o.state === 'active') {
          this.activeOrders.push(o);
        }
      });

    });
  }

}
