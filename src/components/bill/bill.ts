import { OrderProvider } from './../../providers/order/order';
import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Order } from '../../interfaces/order';
import { TranslateProvider } from '../../providers/translate/translate';

/**
 * Generated class for the BillComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bill',
  templateUrl: 'bill.html'
})
export class BillComponent {
  public order: Order;
  constructor(public translate: TranslateProvider, private navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private orderProvider: OrderProvider) {
    this.order = this.navParams.get("order");
  }

  getTotal() {
    let total = 0
    for(let plate of this.order.plates) {
      total += (plate.amount * plate.value);
    }

    return total
  }

  cancell() {
    this.viewCtrl.dismiss();
  }

  async closeOrder() {
    await this.orderProvider.closeOrder(this.order.id);
    this.notifyOrderClosedEvent();
  }

  async notifyOrderClosedEvent() {
    let message: string = await this.translate.translateText("Orden cerrada con exito");
    const alert = this.alertCtrl.create({
      message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.cancell();
        }
      }]
    });

    alert.present();
  }

}
