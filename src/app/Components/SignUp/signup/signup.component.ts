import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponentComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  private buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
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

  ngOnInit(): void {
    console.log('ngOnInit');

    function signIn() {
      this.authService
        .signInWithEmailAndPassword(
          this.form.value.email,
          this.form.value.password
        )
        .then(() => {
          this.router.navigate(['/todos']);
        })
        .catch((response) => {
          this.errorMessage = response.message;
        });
    }
  }
}
