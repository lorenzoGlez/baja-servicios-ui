import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users;
  userForm: FormGroup;
  validMessage: string = "";
  displayLogin: boolean = true;
  errorMessage: String = '';
  loading: boolean = false;
  redirectUrl: string = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationService) { 
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit() {
    this.setValidFields(true);
  }

  setValidFields(displayLogin: boolean){
    this.displayLogin = displayLogin;
    if (displayLogin){
      this.userForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });  
    }else{
      this.userForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        nombre: new FormControl(''),
        apellido: new FormControl(''),
        calle: new FormControl(''),
        colonia: new FormControl(''),
        codigoPostal: new FormControl(''),
        localidadId: new FormControl(''),
        estadoId: new FormControl(''),
        telefonos: new FormControl('')
      });     
    }
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.userForm.value.email,this.userForm.value.password)
      .subscribe(
        result => {
          this.loading = false;

          if (result) {
            this.userService.login(result.access_token);
            this.navigateAfterSuccess();
          } else {
            this.errorMessage = 'Correo electrónico o contraseña incorrecta';
          }
        },
        error => {
          this.errorMessage = 'Correo electrónico o contraseña incorrecta';
          this.loading = false;
        }
      );
  }

  /*login(){
    this.loading = true;
    if (this.userForm.valid){
      this.userService.authenticate(this.userForm.value).subscribe(
        data =>{this.authenticate(<Boolean> data)},
        err => {
          console.log(err); 
          this.errorMessage = err;
          this.loading = false;
        }
      );
    }else{

    }
  }
  authenticate(success: Boolean) {
    if (success){
      this.navigateAfterSuccess();
    }else{
      this.errorMessage = 'Correo electrónico o contraseña incorrecta';
      console.log(this.errorMessage);
    }
    this.loading = false;
  }*/

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

  submitRegistration(){
    if (this.userForm.valid){
      this.validMessage = "¡Userio registeredo!";
      this.userService.createUsuario(this.userForm.value).subscribe(
        data => {
          this.userForm.reset();
          return true;
        },
        error => {
          return Observable.throw (error);          
        }
      );
    }else{
      console.log('Datos invalidos');
    }
  }



}
