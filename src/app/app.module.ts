import { BillComponent } from './../components/bill/bill';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { GoogleMaps } from '@ionic-native/google-maps';

import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { OrderProvider } from '../providers/order/order';
import { UserProvider } from '../providers/user/user';
import { TranslateProvider } from '../providers/translate/translate';
import { PlatesListComponent } from '../components/plates-list/plates-list';
import { AdminPage, CreatePage, HomePage, LocatePage, OrdersPage } from '../pages';
import { TranslatePipe } from '../pipes/translate/translate';
import { NavbarappComponent } from '../components/navbar/navbar';

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
    AdminPage,
    CreatePage,
    HomePage,
    LocatePage,
    OrdersPage,
    BillComponent,
    NavbarappComponent,
    PlatesListComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    BillComponent,
    PlatesListComponent,
    AdminPage,
    CreatePage,
    HomePage,
    LocatePage,
    OrdersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AngularFireDatabase,
    OrderProvider,
    GoogleMaps,
    UserProvider,
    TranslateProvider
  ]
})
export class AppModule { }
