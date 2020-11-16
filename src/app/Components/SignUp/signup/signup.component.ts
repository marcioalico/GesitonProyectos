import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SignUpForm } from '../../../Models/SignUpForm';
import { Constants } from '../../../Utils/Constants'
import { InternalUser } from '../../../Models/user.interface';
import { Role } from '../../../Models/role.interface';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponentComponent implements OnInit {

  signUpForm: FormGroup;
  nuevoSignUp: SignUpForm;
  public newUser: InternalUser;
  public constantsGeneral: Constants.General;
  public rol: Role;

  constructor(
    public Constants: Constants.General,
    private authService: AuthService,
    private router: Router)   
  {
    this.nuevoSignUp = new SignUpForm('', '', '', '', '', '', new Date());
    this.rol = new Role('QaZsHtiJdvq8c4HYFGa3', '', '');
    //this.newUser = new InternalUser('', '', '', '', this.rol, '', '', new Date());
  }

  onSubmit() {
    console.log(this.signUpForm);
    console.log('SIGNUP ACTION');
    this.newUser.fechaNacimiento = this.nuevoSignUp._fechaNacimiento
    
    this.newUser.fullname = this.nuevoSignUp._fullname;

    // ROL from form
    this.rol.clienteId = 'QaZsHtiJdvq8c4HYFGa3'
    this.rol.description = this.nuevoSignUp._rol
    this.rol.rango = this.nuevoSignUp._rango
    this.newUser.rol = this.rol

    this.authService.createUser(this.nuevoSignUp._email, this.nuevoSignUp._password, this.newUser);

  }

  ngOnInit(): void {}
}