import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { NewPlacePage } from '../new-place/new-place';
import { PlacesService } from '../../services/places.service';

import { PlacePage } from '../place/place';
import { Place } from '../../model/place.model';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  places: { title: string }[] = [];

  constructor(public navCtrl: NavController, private placesService: PlacesService,
    private modalCtrl: ModalController) {

  }
  
  ionViewWillEnter() {
    this.placesService.getPlaces()
      .then(

      (places) => this.places = places

      );
  }
  onLoadNewPlace() {
    this.navCtrl.push(NewPlacePage)
  }

  onOpenPlace(place: Place) {
    console.log(this.modalCtrl);
    this.modalCtrl.create(PlacePage, place).present();
  }

}
