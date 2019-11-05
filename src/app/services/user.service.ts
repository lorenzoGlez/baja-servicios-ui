import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import {JwtHelper} from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_NAME } from '../../../constants';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken: String;
  isSet: boolean;
  isAdminX: boolean = false;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get('/server/api/v1/usuarios');
  }

  getUsuario(email: String){
    return this.http.get('/server/api/v1/usuarios/' + email);
  }

  createUsuario(user){
    let body = JSON.stringify(user);
    return this.http.post('/server/api/v1/usuarios', body, httpOptions)
  }

  authenticate(user){
    let body = JSON.stringify(user);
    this.accessToken = 'fake Token';
    return this.http.get('/server/api/v1/usuarios/authenticate/' + user.email + "/" + user.password);
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdminX = decodedToken.authorities.some(authority => authority === 'ADMIN_USER');
    this.accessToken = accessToken;
    this.isSet=true;

    localStorage.setItem(TOKEN_NAME, accessToken);
  }

  logout() {
    this.accessToken = null;
    this.isAdminX = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdminX;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdminX;
  }

}
