import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class Locations {

  data: any;
  lat: number;
  long: number;
  radius: number;
  coords: string;

  location: { lat: number, lng: number } = { lat: 0, lng: 0 };

  constructor(public http: Http, private geolocation: Geolocation) {

  }

  load(lat, lng) {

    this.coords = lat + ',' + lng;
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + this.coords + '&radius=900&type=cafe&keyword=coffee&key=AIzaSyD9DG-l3nQM0seilByyK4ye58nU7YayA38')
        .map(res => res.json()).subscribe(data => {
          console.log(data.results);
          this.data = data.results;
          this.data = this.applyHaversine(data.results, lat, lng);

          this.data.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          })
          console.log(this.data);
          resolve(this.data);

        });

    });

  }
  setRadius(radius) {
    radius = this.radius;
  }
  applyHaversine(locations, currentLat, currentLong) {

    let usersLocation = {
      lat: currentLat,
      lng: currentLong
    };

    locations.map((location) => {

      let placeLocation = {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'miles'
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

}