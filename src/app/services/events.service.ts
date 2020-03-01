import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class EventsService {
    appUrl = 'https://bfinance-house-service.herokuapp.com/api/v1';
    //appUrl: string = 'http://localhost:3000/api/v1';
    eventUrl: string = this.appUrl + '/event';
    transactionurl = this.appUrl + '/transactions'

    constructor(private http: HttpClient) { }

    deleteEvent(eventId) {
        return this.http.delete(this.eventUrl+"/"+eventId);
    }

    createEvent(payload) {
        
        return this.http.post(this.eventUrl, payload);
    }

    getAllEvents() {
        return this.http.get(this.eventUrl);
    }

    getEventDetails(eventId) {
        return this.http.get(`${this.eventUrl}/${eventId}`)
    }

    getTransactionsByEventId(eventId) {
        return this.http.get(`${this.eventUrl}/${eventId}/transactions`)
    }

    createTransaction(payload) {
        return this.http.post(this.transactionurl,payload);
    }

   
}