import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppComponent } from "../../app.component";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    appUrl = 'https://bfinance-house-service.herokuapp.com/api/v1';
    //appUrl: string = 'http://localhost:3000/api/v1';
    loginUrl: string = this.appUrl + '/auth/login';
    verifyTokenUrl: string = this.appUrl + '/auth/verifytoken';
  

    constructor(private http: HttpClient) { }

  

    login(payload) {
        const headers = {
            'Content-type': 'application/json'
        }
        return this.http.post(this.loginUrl, payload, { headers });
    }
    verifyToken(token) {
        const headers = {
            'Content-type': 'application/json',
            'token': token
        }
        return this.http.post(this.verifyTokenUrl, {}, { headers });
    }

    isLoggedIn() {
        // if (sessionStorage.getItem('token') !== null) {
        //     return true;
        // } else {
        //     return localStorage.getItem('token') !== null;
        // }

    }
    

    getAuthToken() {
        if (sessionStorage.getItem('token') != null) {
            return sessionStorage.getItem('token');
        } else {
            return localStorage.getItem('token');
        }
    }

    logout() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

   
}