import { Component } from '@angular/core';
import { Plate } from '../../interfaces/plate';
import { TranslateProvider } from '../../providers/translate/translate';
import { ViewController, NavParams } from 'ionic-angular';
import { plates } from '../../assets/plates';

/**
 * Generated class for the PlatesListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'plates-list',
  templateUrl: 'plates-list.html'
})
export class PlatesListComponent {
  public plates: Plate[] = plates;
  public text: string;

  constructor(public translate: TranslateProvider, private viewCtrl: ViewController, private navParams: NavParams) {
    this.plates = this.navParams.get('plates');
  }

  dissmiss(plate) {
    console.log(plate);
    this.viewCtrl.dismiss(plate);
  }

}
