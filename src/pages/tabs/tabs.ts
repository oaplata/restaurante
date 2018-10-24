import { OrdersPage } from './../orders/orders';
import { LocatePage } from './../locate/locate';
import { CreatePage } from './../create/create';
import { AdminPage } from './../admin/admin';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  public admin = AdminPage;
  public create = CreatePage;
  public locate = LocatePage;
  public orders = OrdersPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
