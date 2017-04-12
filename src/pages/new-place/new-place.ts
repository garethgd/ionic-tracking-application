import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'page-new-place',
  templateUrl: 'new-place.html'
})

export class NewPlacePage {
  
  location: { lat: number, lng: number } = { lat: 0, lng: 0 };

  constructor(private placesService: PlacesService, private navCtrl: NavController, private geolocation: Geolocation) { }

  onLocateUser() {
    console.log("locating")
    this.geolocation.getCurrentPosition()
      .then(
      (location) => {
        console.log('Location successful')
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude
      }
      )
  }
  
  // onAddPlace(value: { title: string }) {
  
  //   console.log(value);
  //   this.placesService.addPlace({ title: value.title, location: this.location });
  //   this.navCtrl.pop();

  // }

}
