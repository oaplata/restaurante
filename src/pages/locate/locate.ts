import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-locate',
  templateUrl: 'locate.html',
})
export class LocatePage {
  public map: GoogleMap;
  constructor(public navParams: NavParams,
    private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  async loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);
    await this.map.one(GoogleMapsEvent.MAP_READY).catch(error => console.log(error));
    await this.getPosition();
  }

  async getPosition() {
    const response: any = await this.map.getMyLocation().catch(error => console.log(error));
    const latLng = {
      lat: 6.5543845,
      lng: -73.1337710
    };
    this.map.moveCamera({
      target: latLng
    });
    this.map.addMarker({
      title: 'My Position',
      icon: 'blue',
      animation: 'DROP',
      position: response.latLng
    });

    this.map.addMarker({
      title: 'El Rinconcito del Sabor',
      icon: 'blue',
      animation: 'DROP',
      position: latLng
    });
  }

}
