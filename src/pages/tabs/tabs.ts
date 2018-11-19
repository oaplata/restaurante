import { OrdersPage } from './../orders/orders';
import { LocatePage } from './../locate/locate';
import { CreatePage } from './../create/create';
import { AdminPage } from './../admin/admin';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

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
  public user: any = {role: ''};

  constructor(private authProvider: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  async ionViewDidLoad() {
    this.user = await this.authProvider.getSesion();  
  }

}
