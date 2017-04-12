import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { App, MenuController } from 'ionic-angular';
import { InfoPage } from '../pages/info/info';
import { MoreAppsPage } from '../pages/more-apps/more-apps';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = TabsPage;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, app: App, menu: MenuController) {

    this.pages = [
      { title: 'Homepage', component: TabsPage },
      { title: 'More Apps', component: MoreAppsPage },
      { title: 'Info', component: InfoPage }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
