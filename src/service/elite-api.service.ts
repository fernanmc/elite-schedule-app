import {Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EliteApi{
    private baseUrl = "https://elite-schedule-app-92cc8.firebaseio.com";
    currentTourney : any = {};
    constructor(private http: Http){}

    getTournaments(){ // en este metodo se usan promesas 
        return new Promise(resolve =>{
            this.http.get(`${this.baseUrl}/tournaments.json`).
            subscribe(res => resolve(res.json()));
        })
    }

    getTournamentData(tourneyID): Observable<any>{ //se esta usando rxjs para recoger los datos de la api
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyID}.json`)
        .map((response: Response)=>{
            this.currentTourney = response.json();
            return this.currentTourney;
        });
    }

     getCurrentTourney(){
        return this.currentTourney;
    }
}