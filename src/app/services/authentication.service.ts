import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from "rxjs/operators";
import { tap } from 'rxjs/operators';

import {TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    //const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');

    const headersX = new HttpHeaders();
    headersX.append('Content-Type', 'application/x-www-form-urlencoded');
    headersX.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    let options = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    };

    /*return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .pipe(map(res => res))
      .pipe(map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      }));*/

      return this.http.post<{access_token:  string}>(AuthenticationService.AUTH_TOKEN, body.toString(), options)
        .pipe(tap(res => {
          return res.access_token;
      }));
    }

}