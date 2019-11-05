import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  displayComplete: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setValidFields(true);
  }

  setValidFields(displayComplete){
    this.displayComplete = displayComplete
    if (displayComplete){
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

      })
    }
  }

  submitRegistration(){
    if (this.userForm.valid){
      this.userService.createUsuario(this.userForm.value).subscribe(
        data => {console.log('Usuario Creado')},
        err => {console.log('Error al crear usuario')}
      )
    }else{
      console.log('Error: Uno o mas datos invalidos');
    }
  }

}
