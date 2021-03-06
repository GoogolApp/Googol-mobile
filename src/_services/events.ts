import { Injectable } from '@angular/core';
import { Match } from '../_models/match';
import { Event } from '../_models/event';
import { AppUrl } from '../_config/url.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService {

    private url: string = AppUrl.root + '/events';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(private http: HttpClient) { }

    getAll() : Observable<Event[]> {
        return this.http.get<Event[]>(this.url, this.httpOptions)
            .map(events => {
                return events.map(function(event) {
                    const currDate = new Date();
                    const date = new Date(event.match.matchDate);

                    date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
                    event.match.matchDate = date;

                    let timeDiff = currDate.getTime() - date.getTime();
                    if(timeDiff/3600000 <= 2.5) {
                        return event;
                    }
                }).filter(event => event !== undefined);
            });
    }

    create(matchId: string, barId: string, userId?: string){
        let body;
        if(userId !== undefined) {
            body = {
                "matchId": matchId,
                "barId": barId,
                "userId": userId
            }
        } else {
            body = {
                "matchId": matchId,
                "barId": barId
            }
        }
        return this.http.post<Event>(this.url, body, this.httpOptions)
            .map(events => {
                return events;
            });
    }

    getById(userId: string) : Observable<Event[]> {
        return this.http.get<any[]>(this.url, this.httpOptions)
            .map(events => {
                return events.map(function(event) {
                    const currDate = new Date();
                    const date = new Date(event.match.matchDate);

                    date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
                    event.match.matchDate = date;

                    let timeDiff = currDate.getTime() - date.getTime();
                    if(timeDiff/3600000 <= 2.5) {
                        return event;
                    }
                }).filter(event =>
                    event !== undefined && event.user !== undefined && event.user === userId
                );
            });
    }

    getEventById(eventId : string) : Observable<Event> {
        return this.http.get<Event>(this.url + '/' + eventId, this.httpOptions);
    }

    confirmPresence (eventId: string): Observable<Event> {
        return this.http.patch<Event>(this.url + '/' + eventId, {operation: 'confirm'});
    }

    unconfirmPresence (eventId: string): Observable<Event> {
        return this.http.patch<Event>(this.url + '/' + eventId, {operation: 'unconfirm'});
    }

    confirmEventByOwner (eventId: string) : Observable<Event> {
      return this.http.patch<Event>(this.url + '/' + eventId, {
        operation: 'confirmedByOwner'
      });
    }

    removeEventByOwner (eventId: string) : Observable<Event> {
        return this.http.delete<Event>(this.url + '/' + eventId);
    }

    remove(eventId: string) : Observable<Event> {
        return this.http.delete<Event>(this.url + '/' + eventId, this.httpOptions)
            .map(deletedEvent => {
                return deletedEvent;
            });
    }

}
