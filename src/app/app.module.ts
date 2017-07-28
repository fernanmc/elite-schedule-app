import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { MyTeamsPage, TournamentsPage,TeamsPage,TeamDetailPage, StandingsPage, TeamHomePage,GamePage } from '../pages/pages';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import {UserSettings, EliteApi} from '../service/service';


@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage, 
    TeamHomePage,
    GamePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage, 
    TeamHomePage,
    GamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserSettings,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
