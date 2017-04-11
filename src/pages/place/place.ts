
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {
  lat: number;
  lng: number;
  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.viewCtrl.dismiss();
    this.lat = this.navParams.data.location.lat;
    this.lng = this.navParams.data.location.long;
  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }
}
