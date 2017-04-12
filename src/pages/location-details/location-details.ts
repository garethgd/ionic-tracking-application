import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the LocationDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location-details',
  templateUrl: 'location-details.html'
})
export class LocationDetailsPage {

 constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    this.viewCtrl.dismiss();
    // this.lat = this.navParams.data.location.lat;
    // this.lng = this.navParams.data.location.long;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationDetailsPage');
  }

}
