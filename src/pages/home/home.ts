import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { Geofence } from '@ionic-native/geofence';

import { Geolocation } from '@ionic-native/geolocation';
import { ActivePage } from '../active/active';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [

    trigger('flip', [
      state('flipped', style({
        transform: 'rotate(180deg)',
        backgroundColor: '#f50e80'
      })),
      transition('* => flipped', animate('400ms ease'))
    ]),

    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(150%, 0, 0)'
      })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out'))
    ]),

    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('200ms linear'))
    ]),

    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('300ms ease-in', keyframes([
          style({ transform: 'translate3d(0,0,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-10px,0)', offset: 0.5 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ])

  ]
})

export class HomePage {
  radius: number = 100;
  error: any;
  success: any;
  jelly = true;
  tabBarElement: any;


  flipState: String = 'notFlipped';
  flyInOutState: String = 'in';
  fadeState: String = 'visible';
  bounceState: String = 'noBounce';

  toggleFlip() {
    this.flipState = (this.flipState == 'notFlipped') ? 'flipped' : 'notFlipped';
  }

  toggleFlyInOut() {

    this.flyInOutState = 'out';

    setInterval(() => {
      this.flyInOutState = 'in';
    }, 2000);

  }

  toggleFade() {
    this.fadeState = (this.fadeState == 'visible') ? 'invisible' : 'visible';
  }

  toggleBounce() {
    this.bounceState = (this.bounceState == 'noBounce') ? 'bouncing' : 'noBounce';
  }

  constructor(public navCtrl: NavController, private platform: Platform, private geolocation: Geolocation, private geofence: Geofence,
    private toastCtrl: ToastController, public locations: Locations) {
    this.tabBarElement = document.querySelector('.tabbar');



    this.platform.ready().then(() => {

      this.geofence.initialize().then(
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

      let toast = this.toastCtrl.create({
        message: "Set the search radius for coffee in your area.",
        duration: 8000,
        showCloseButton: true,
        closeButtonText: "Close"
      });

      toast.onDidDismiss(() => {
        console.log("Toast buton clicked");

        ///undo operation
      });
      toast.present();
    }, 4000)
  }
  setGeofence(value: number) {
    this.locations.setRadius(value)
    this.geolocation.getCurrentPosition({
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

      this.geofence.addOrUpdate(fence).then(
        () => this.success = true,
        (err) => this.error = "Failed to add or update the fence."
      );

      this.geofence.onTransitionReceived().subscribe(resp => {
        // SMS.send('0879134950', 'I am in your vicinity!');
      });

      this.navCtrl.push(ActivePage);


    }).catch((error) => {
      this.error = error;
    });
  }

}
