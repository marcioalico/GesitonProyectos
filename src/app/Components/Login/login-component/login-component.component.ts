import { Component, NgModule, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SignUpForm } from 'src/app/Models/SignUpForm';
import { Constants } from '../../../Utils/Constants'

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})

export class LoginComponentComponent implements OnInit {

  //loginForm: ;
  loginForm: FormGroup;
  newLogin: SignUpForm

  constructor(
    private route: ActivatedRoute,
    public Constants: Constants.General,
    private authService: AuthService,
    private router: Router) {
    this.newLogin = new SignUpForm('', '', '', '', '', '', new Date());
  }

  onSubmit() {
    console.log(this.newLogin);
    console.log('LOGIN ACTION');

    
  //  firebase
  //    .auth()
  //    .createUserWithEmailAndPassword(this.newLogin._email, this.newLogin._password)
  //    .catch(function (error) {
  //      var errorCode = error.code;
  //      var errorMessage = error.message;
  //      alert(errorMessage);
  //    });
  //  this.createUserDocument();
    
  firebase.auth().signInWithEmailAndPassword(this.newLogin._email, this.newLogin._password)
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  }  else {
    alert(errorMessage);
}
  this.router.navigate(['Index']);
  console.log(error);
});



  }

  createUserDocument() {
      
  }

  ngOnInit(): void {
  }
}
