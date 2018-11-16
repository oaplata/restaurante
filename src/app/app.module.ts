import { BillComponent } from './../components/bill/bill';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { GoogleMaps } from '@ionic-native/google-maps';

import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { ComponentsModule } from '../components/components.module';
import { TabsPage } from '../pages/tabs/tabs';
import { AdminPageModule } from '../pages/admin/admin.module';
import { OrdersPageModule } from '../pages/orders/orders.module';
import { CreatePageModule } from '../pages/create/create.module';
import { LocatePageModule } from '../pages/locate/locate.module';
import { OrderProvider } from '../providers/order/order';

export const firebaseConfig = {
  apiKey: "AIzaSyAfkUQmDrDNqxPJaJrot9AS3G6DFVTCasU",
  authDomain: "restaurante-2429b.firebaseapp.com",
  databaseURL: "https://restaurante-2429b.firebaseio.com",
  projectId: "restaurante-2429b",
  storageBucket: "restaurante-2429b.appspot.com",
  messagingSenderId: "44502623326"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    ComponentsModule,
    AdminPageModule,
    OrdersPageModule,
    CreatePageModule,
    LocatePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    BillComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AngularFireDatabase,
    OrderProvider,
    GoogleMaps
  ]
})
export class AppModule { }
