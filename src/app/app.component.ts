import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events,LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyTeamsPage, TournamentsPage,TeamHomePage} from '../pages/pages';
import {UserSettings, EliteApi} from '../service/service';

@Component({
  templateUrl: 'app.html',
  providers:[
    EliteApi,
    
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  teams = [];
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public UserSettings:UserSettings, public events:Events, public eliteApi:EliteApi,
    public LoadingController:LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Teams', component: MyTeamsPage },
      { title: 'Tournaments', component: TournamentsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refresherFavorites();

       this.events.subscribe('favorites:changed', () => this.refresherFavorites()); 
    });
  }

  refresherFavorites(){
    this.teams = this.UserSettings.getAllFavorites();
  }

  goToTeam($event, favorite){
      let loader = this.LoadingController.create({
        content: "Getting data",
        dismissOnPageChange:true
      });
      loader.present();
      console.log("Tournament id",favorite.tournamentId)
      this.eliteApi.getTournamentData(favorite.tournamentId).
      subscribe(t => this.nav.push(TeamHomePage,favorite.team));

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
