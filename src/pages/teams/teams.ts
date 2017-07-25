import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams } from 'ionic-angular';
import {TeamHomePage} from '../pages';
import {EliteApi} from '../../service/service';
import * as _ from 'lodash';


/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public eliteApi: EliteApi,
    public LoadingController: LoadingController
    ) { }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
      let loader = this.LoadingController.create({
            content: "Getting Teams...",
            //spinner: 'circle'
    });

   loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
            _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();

        this.teams = this.allTeamDivisions;
        console.log('division teams', this.teams); 
        loader.dismiss();
      });
    });
  
      
   
    console.log('ionViewDidLoad TeamsPage');
  }
  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }
}
