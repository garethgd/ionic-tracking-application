import { Component, ElementRef, ViewChild, Injectable } from '@angular/core';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',

})
@Injectable()
export class AboutPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  coords: string;
  lat: any;
  lng : any;
  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, public locations: Locations, private geolocation: Geolocation) {


  }

  ionViewDidLoad() {



    this.platform.ready().then(() => {


      // get current position
      this.geolocation.getCurrentPosition().then(pos => {

        this.coords = pos.coords.latitude + ',' + pos.coords.longitude;
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        let locationsLoaded = this.locations.load(this.lat, this.lng);

       
        Promise.all([
          mapLoaded,
          locationsLoaded
        ]).then((result) => {

          let locations = result[1];
          console.log(locations);
          console.log(result);
          for (let location of locations) {
           
            this.maps.addMarker(location.geometry.location.lat, location.geometry.location.lng ,"h", "h");
          }

        });
      });




    });

  }

}