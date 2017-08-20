import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage} from '@ionic/storage';

//import * as _ from 'lodash';

@Injectable()
export class UserSettings {

    constructor(public storage:Storage,
                public events:Events) { }

    favoriteTeam(team, tournamentId, tournamentName){
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        this.storage.set(String(team.id), JSON.stringify(item));
        this.events.publish('favorites:changed');
    }

    unfavoriteTeam(team){
        this.storage.remove(String(team.id));
        this.events.publish('favorites:changed');
    }

    isFavoriteTeam(teamId){
        return this.storage.get(String(teamId)).then(value => value ? true : false);
    }

    getAllFavorites(){
        let items = [];
      /*  _.forIn(window.localStorage, (v, k) => {
            items.push(JSON.parse(v));
        });*/
        this.storage.forEach( (value, key, index) => {
        console.log(value);
        console.log(key);
        console.log(index);
        
        items.push(JSON.parse(value));
    });
        console.log("return", items.length ? items : null);
        return items;
    }
}