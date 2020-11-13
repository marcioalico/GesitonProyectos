import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './Components/Home/home-component/home-component.component';
import { LoginComponentComponent } from './Components/Login/login-component/login-component.component';
import { SignupComponentComponent } from './Components/SignUp/signup/signup.component';


const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'index', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'signup', component: SignupComponentComponent },
  { path: 'SignUp', component: SignupComponentComponent },
  { path: '**', component: HomeComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
