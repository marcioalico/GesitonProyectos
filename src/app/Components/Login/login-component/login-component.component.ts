import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SignUpForm } from 'src/app/Models/SignUpForm';
import { Constants } from '../../../Utils/Constants'

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  
  //loginForm: ;
  signUpForm: FormGroup;
  nuevoSignUp: SignUpForm

  constructor(
    public Constants: Constants.General,
    private authService: AuthService,
    private router: Router) {
    this.nuevoSignUp = new SignUpForm('', '', '', '', '', '', '', new Date());
    //this.createForm();
  }

  /** 
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  
  register(event: Event) {
    console.log('register', event);
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password).then(() => {
        console.log('exito al registrar');
      });
    }
  }
  **/

  onSubmit() {
    console.log(this.signUpForm);
    console.log('SIGNUP ACTION');
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.nuevoSignUp._email, this.nuevoSignUp._password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
    this.createUserDocument();
  }

  createUserDocument() {
      
  }

  ngOnInit(): void {}
}
