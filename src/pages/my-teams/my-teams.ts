import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TournamentsPage} from '../pages';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage);
  }

}
