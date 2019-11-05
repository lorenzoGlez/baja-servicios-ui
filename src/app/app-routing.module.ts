import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'perfil',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
