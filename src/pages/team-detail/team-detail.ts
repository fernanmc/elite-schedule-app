import { Component } from '@angular/core';
import { ToastController, AlertController, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import * as _ from 'lodash';
import { UserSettings, EliteApi } from '../../service/service';
import { GamePage } from '../pages';


/**
 * Generated class for the TeamDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  allGames: any[];
  games: any[];
  team: any;
  dateFilter: string;
  teamStanding: any;
  private tourneyData: any;
  useDateFilter = false;
  isFollowing: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi,
    public userSettings: UserSettings,
    public alertController: AlertController,
    public toastController: ToastController) {
            this.team = this.navParams.data;
            this.tourneyData = this.eliteApi.getCurrentTourney();
            this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
            this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });

    //console.log("navparams" + this.navParams.data);
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();
    this.allGames = this.games;

    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
    console.log(typeof (this.teamStanding.wins));



  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  goToHome() {
    this.navCtrl.parent.parent.popToRoot();
    console.log("parent", this.navCtrl.parent);
  }
  gameClicked($event, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
    console.log(sourceGame);
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }

    console.log("Games", this.dateFilter);

  }

  getScoreGame(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game) {

    return game.scoreDisplay.indexOf('W:') === 0 ? 'badge-primary' : 'badge-danger';
  }

  toggleFollow() {
    console.log("Estoy dentro");

    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: "Unfollow?",
        message: "Are you sure you want unfollow?",
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;

              let toast = this.toastController.create({
                message: "You have unfollowed this team",
                duration: 2000,
                position: "bottom"
              });
              this.userSettings.unfavoriteTeam(this.team);
              toast.present();
            },

          },
          { text: "No" }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team,
        this.tourneyData.tournament.id,
        this.tourneyData.tournament.name
      );
      console.log("TourneyDate", this.tourneyData);
    }
  }

}
