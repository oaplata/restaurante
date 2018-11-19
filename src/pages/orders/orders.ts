import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../interfaces/order';
import { BillComponent } from '../../components/bill/bill';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  public active: string = 'true';
  public allOrders: Order[] = [];
  public activeOrders: Order[] = [];
  public user: any;

  constructor(private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams, private orderProvider: OrderProvider, public storage: Storage, private alertCtrl: AlertController, private modalCtrl: ModalController) {
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

  async ionViewDidLoad() {
    this.user = await this.authProvider.getSesion();
    if (!this.user) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.orderProvider.getOrders().valueChanges().subscribe((orders: Order[]) => {
        this.allOrders = [];
        this.activeOrders = [];
        
  
        orders.forEach(o => {
          if (o.state === 'active') {
            this.allOrders = orders;
            if (this.user.role === 'cliente') {
              if (o.user === this.user.uid) {
                this.activeOrders.push(o);
              }
            } else  {
              this.activeOrders.push(o);
            }
          } else {
            if (this.user.role === 'cliente') {
              if (o.user === this.user.uid) {
                this.allOrders.push(o);
              }
            } else {
              this.allOrders = orders;
            }
          }
        });
  
      });
    }
    
  }

}
