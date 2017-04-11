import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { Place } from '../model/place.model';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { Geofence } from '@ionic-native/geofence';
import { NewPlacePage } from '../pages/new-place/new-place';
import { PlacePage } from '../pages/place/place';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ActivePage } from '../pages/active/active';
import { PlacesService } from '../services/places.service';
import { ConnectivityService } from '../providers/connectivity-service';
import { Locations } from '../providers/locations';
import { AgmCoreModule } from 'angular2-google-maps/core'
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '../providers/google-maps';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ActivePage,
    NewPlacePage,
    PlacePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9DG-l3nQM0seilByyK4ye58nU7YayA38'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ActivePage,
    NewPlacePage,
    PlacePage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ConnectivityService, PlacesService, Storage, Geolocation, SplashScreen, StatusBar, Geofence, Network, Locations, GoogleMaps]
})
export class AppModule { }
