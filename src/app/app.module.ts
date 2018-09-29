import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';

import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';

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
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    AngularFireDatabase
  ]
})
export class AppModule { }
