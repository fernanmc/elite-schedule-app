import { UserSettings, EliteApi } from './../../service/service';
import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams } from 'ionic-angular';
import {TeamHomePage, TournamentsPage} from '../pages';

/**
 * Generated class for the MyTeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites = [];
  /* favorites = [
        {
            team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
            tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName: 'March Madness Tournament'
        },
        {
            team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
            tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
            tournamentName: 'Holiday Hoops Challenge'
        }
    ];*/

  constructor(public navCtrl: NavController, 
           public navParams: NavParams,
           public eliteApi: EliteApi,
           public userSettings : UserSettings,
           public  LoadingController: LoadingController) {
              this.favorites = this.userSettings.getAllFavorites();
              
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite){
      let loader = this.LoadingController.create({
        content: "Getting data",
        dismissOnPageChange:true
      });
      loader.present();
      console.log("Tournament id",favorite.tournamentId)
      this.eliteApi.getTournamentData(favorite.tournamentId).
      subscribe(t => this.navCtrl.push(TeamHomePage,favorite.team));

  }

  ionViewDidLoad() {
    this.favorites = this.userSettings.getAllFavorites();
        
  }


}
