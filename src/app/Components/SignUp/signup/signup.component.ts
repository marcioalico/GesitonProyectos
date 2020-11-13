import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { SignUpForm } from 'src/app/Models/SignUpForm';
import { Constants } from '../../../Utils/Constants'
import { InternalUser } from 'src/app/Models/user.interface';
import { Role } from '../../../Models/role.interface';
import { rawListeners } from 'process';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponentComponent implements OnInit {
  //signUpForm: ;
  signUpForm: FormGroup;
  nuevoSignUp: SignUpForm
  public datepipe: DatePipe;
  public newUser: InternalUser;
  public constantsGeneral: Constants.General;
  public rol: Role;
  //public clientId: string;

  constructor(
    public Constants: Constants.General,
    private authService: AuthService,
    private router: Router)   
  {
    //this.clientId = this.constantsGeneral.clientId
    this.nuevoSignUp = new SignUpForm('', '', '', '', '', '', new Date());
    //this.rol = new Role(this.clientId, '', '');
    this.newUser = new InternalUser('', '', '', '', this.rol, '', '', '');
  }

  onSubmit() {
    console.log(this.signUpForm);
    console.log('SIGNUP ACTION');
    this.authService.createUser(this.nuevoSignUp._email, this.nuevoSignUp._password);
    
    // ROL from form
    /*this.rol.clienteId = this.constantsGeneral.clientId
    this.rol.description = this.nuevoSignUp._rol
    this.rol.rango = this.nuevoSignUp._rango
    this.newUser.rol = this.rol*/
  
    // birth date from form
    let birthDate: string = this.dateToString(this.nuevoSignUp._fechaNacimiento)
    this.newUser.fechaNacimiento = birthDate


    this.newUser.fullname = this.nuevoSignUp._fullname;

    this.authService.updateUserData(this.newUser);
  }

  dateToString(date: Date): string {
    let dateString = this.datepipe.transform(date, 'yyyy-MM-dd');
    return dateString;
   }

  createUserDocument() {
      
  }

  ngOnInit(): void {}
}