import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EliteApi} from '../../service/service';
import * as _ from 'lodash';

/**
 * Generated class for the StandingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  allStandings: any [];
  standings: any [];
  team: any;
  divisionfilter='division';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eliteApi: EliteApi) {}

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
   // this.divisionfilter='division';


    /*this.allStandings =
            _.chain(this.standings)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();*/
    this.allStandings = tourneyData.standings;
    console.log('standings', this.standings);
   
  }

 divisionFilter(){
      if(this.divisionfilter ==='all'){
        console.log(this.divisionFilter);
        this.standings = this.allStandings;
         console.log('division standings', this.allStandings);
      }else{
        this.standings = _.filter(this.allStandings, s=>s.division===this.team.division);
         console.log(this.divisionFilter);
      }
  }

  getHeader(record, recordIndex, records){ //dividiendo por vistual scroll
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {

      return record.division;
    }
    return null;  
  }

}
