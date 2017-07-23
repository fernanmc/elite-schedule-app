import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EliteApi} from '../../service/service';
import {TeamHomePage} from '../../pages/pages';
/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eliteApi:EliteApi) {
          this.game = this.navParams.data;

  }

  ionViewDidLoad() {
   // this.game = this.navParams.data;
    console.log('ionViewDidLoad GamePage');
  }
  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
}
