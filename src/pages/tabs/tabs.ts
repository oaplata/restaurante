import { OrdersPage } from './../orders/orders';
import { LocatePage } from './../locate/locate';
import { CreatePage } from './../create/create';
import { AdminPage } from './../admin/admin';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('menu') tabs: Tabs;
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
