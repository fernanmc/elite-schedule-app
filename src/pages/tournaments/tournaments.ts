import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import {TeamsPage} from '../pages';
import {EliteApi} from '../../service/service';


/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments: any;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public eliteApi: EliteApi,
  public LoadingController: LoadingController) {

  }


  itemTapped($event,tourney){
    this.navCtrl.push(TeamsPage,tourney);
  }

  ionViewDidLoad() {
    let loader = this.LoadingController.create({
            content: "Getting tournaments",
            //spinner: 'circle'
    });
    loader.present().then(() =>{
         this.eliteApi.getTournaments().then(data=>{
         this.tournaments = data;
          loader.dismiss(); 
        });
    } );
   
    console.log('ionViewDidLoad TournamentsPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter TournamentsPage');
  }

   ionViewWillLeave() {
    console.log('ionViewWillLeave TournamentsPage');
  }

   ionViewDidUnload() {
    console.log('ionViewDidUnload TournamentsPage');
  }

}
