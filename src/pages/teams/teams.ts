import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams } from 'ionic-angular';
import {TeamHomePage} from '../pages';
import {EliteApi} from '../../service/service';

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

     loader.present().then(() =>{
        this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data=>{
          this.teams = data.teams;
        });
        loader.dismiss();
     });

  
      
   
    console.log('ionViewDidLoad TeamsPage');
  }
  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }
}
