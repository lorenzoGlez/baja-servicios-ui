import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  userForm: FormGroup;
  displayComplete: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setValidFields(true);
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.getUsuario('lorenzo_glez@hotmail.com').subscribe(
      user => {
        this.user = user;
        this.userForm.setValue(this.user);
      },
      err => console.error(err),
      () => console.log ('Usuario obtenido')
    )
  }

  setValidFields(displayComplete){
    this.displayComplete = displayComplete;
    if (displayComplete){
      this.userForm = new FormGroup({
        id: new FormControl(''),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        nombre: new FormControl(''),
        apellido: new FormControl(''),
        calle: new FormControl(''),
        colonia: new FormControl(''),
        codigoPostal: new FormControl(''),
        localidadId: new FormControl(''),
        estadoId: new FormControl(''),
        telefonos: new FormControl(''),
        estatusId: new FormControl(''),
        roles: new FormControl('')
      });
    }
  }

}