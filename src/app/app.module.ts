import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import {AuthConfig, AuthHttp} from 'angular2-jwt';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ProfileComponent } from './components/profile/profile.component';


import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    JobsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['http://localhost:4200/auth/login']
      }
    })
  ],
  providers: [
    UserService,
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
