import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { NewPlacePage } from '../new-place/new-place';
import { PlacesService } from '../../services/places.service';
import { LocationDetailsPage } from '../location-details/location-details';

import { Locations } from '../../providers/locations';

import { PlacePage } from '../place/place';
import { Place } from '../../model/place.model';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations-list.html'
})
export class LocationsListPage {
  places: { title: string }[] = [];

  constructor(public navCtrl: NavController, private placesService: PlacesService,
    private modalCtrl: ModalController,
    public locations: Locations) {

  }
  
  ionViewWillEnter() {
    this.placesService.getPlaces()
      .then(

      (places) => this.places = places

      );
  }
  onLoadNewPlace() {
    this.navCtrl.push(LocationDetailsPage)
  }

  onOpenPlace(place: Place) {
    console.log(this.modalCtrl);
    this.modalCtrl.create(LocationDetailsPage, place).present();
  }

}
