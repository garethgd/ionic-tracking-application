import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class Locations {

  data: any;
  lat: number;
  long: number;


  location: { lat: number, lng: number } = { lat: 0, lng: 0 };

  constructor(public http: Http, private geolocation: Geolocation) {

  }

  load(coords) {


    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coords + '&radius=900&type=cafe&keyword=coffee&key=AIzaSyD9DG-l3nQM0seilByyK4ye58nU7YayA38')
        .map(res => res.json()).subscribe(data => {
          console.log(data.results);
          this.data = data.results;

          console.log(this.data);
          resolve(this.data);

        });

    });



  }

}