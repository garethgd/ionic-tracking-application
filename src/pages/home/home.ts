import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geofence, Geolocation, SMS } from 'ionic-native';
import { ActivePage } from '../active/active';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  radius: number = 100;
  error: any;
  success: any;

  jelly = true;
  tabBarElement: any;

  constructor(public navCtrl: NavController, private platform: Platform) {
    this.tabBarElement = document.querySelector('.tabbar');

    this.platform.ready().then(() => {

      Geofence.initialize().then(
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );
    });
  }

 ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.jelly = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000)
  }
  setGeofence(value: number) {

    Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      var longitude = resp.coords.longitude;
      var latitude = resp.coords.latitude;
      var radius = value;

      let fence = {
        id: "myGeofenceID1",
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        transitionType: 2
      }

      Geofence.addOrUpdate(fence).then(
        () => this.success = true,
        (err) => this.error = "Failed to add or update the fence."
      );

      Geofence.onTransitionReceived().subscribe(resp => {
        SMS.send('0879134950', 'I am in your vicinity!');
      });

      this.navCtrl.push(ActivePage);


    }).catch((error) => {
      this.error = error;
    });
  }

}
